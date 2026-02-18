import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { NPS_TEMPLATE, CSAT_TEMPLATE } from '@/lib/survey-templates'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ responseId: string }> }
) {
  try {
    const { responseId } = await params
    
    console.log('📋 Survey request for:', responseId)
    
    // For demo purposes, return a mock survey if responseId starts with 'test'
    if (responseId.startsWith('test')) {
      return NextResponse.json({
        success: true,
        data: {
          id: responseId,
          survey: {
            id: 'demo-nps-survey',
            name: 'Customer Experience Survey',
            type: 'NPS',
            surveyJson: NPS_TEMPLATE
          },
          organization: {
            name: 'Celeru Demo',
            primaryColor: '#0ea5e9',
            logo: null
          },
          contactEmail: 'demo@example.com'
        }
      })
    }
    
    // Try to find real survey response in database
    const response = await prisma.surveyResponse.findUnique({
      where: { id: responseId },
      include: {
        survey: true,
        organization: {
          select: {
            name: true,
            logo: true,
            primaryColor: true
          }
        }
      }
    })
    
    if (!response) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Survey not found',
          message: 'This survey link may be invalid or expired'
        },
        { status: 404 }
      )
    }
    
    // Check if already completed
    if (response.completedAt) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Survey already completed',
          message: 'Thank you! This survey has already been completed.'
        },
        { status: 410 }
      )
    }
    
    // Parse survey JSON (it's stored as string in SQLite)
    let surveyJson
    try {
      surveyJson = typeof response.survey.surveyJson === 'string' 
        ? JSON.parse(response.survey.surveyJson)
        : response.survey.surveyJson
    } catch (e) {
      console.error('Error parsing survey JSON:', e)
      surveyJson = NPS_TEMPLATE // Fallback
    }
    
    return NextResponse.json({
      success: true,
      data: {
        id: response.id,
        survey: {
          id: response.survey.id,
          name: response.survey.name,
          type: response.survey.type,
          surveyJson: surveyJson
        },
        organization: response.organization,
        contactEmail: response.contactEmail
      }
    })
    
  } catch (error) {
    console.error('❌ Survey fetch error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Unable to load survey. Please try again later.'
      },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ responseId: string }> }
) {
  try {
    const { responseId } = await params
    const surveyData = await request.json()
    
    console.log('📝 Survey submission for:', responseId, surveyData)
    
    // For demo responses, just return success
    if (responseId.startsWith('test')) {
      const npsScore = surveyData.nps_score
      const category = npsScore >= 9 ? 'promoter' : npsScore >= 7 ? 'passive' : 'detractor'
      
      return NextResponse.json({
        success: true,
        message: 'Survey completed successfully!',
        data: {
          id: responseId,
          score: npsScore,
          type: 'NPS',
          category: category,
          demo: true
        }
      })
    }
    
    // Handle real survey submission
    const response = await prisma.surveyResponse.findUnique({
      where: { id: responseId },
      include: { survey: true }
    })
    
    if (!response) {
      return NextResponse.json(
        { success: false, error: 'Survey not found' },
        { status: 404 }
      )
    }
    
    if (response.completedAt) {
      return NextResponse.json(
        { success: false, error: 'Survey already completed' },
        { status: 400 }
      )
    }
    
    // Extract scores based on survey type
    let npsScore: number | undefined
    let csatScore: number | undefined
    let cesScore: number | undefined
    
    if (response.survey.type === 'NPS') {
      npsScore = surveyData.nps_score
    } else if (response.survey.type === 'CSAT') {
      csatScore = surveyData.csat_score
    } else if (response.survey.type === 'CES') {
      cesScore = surveyData.ces_score
    }
    
    // Update response with submission data
    const updatedResponse = await prisma.surveyResponse.update({
      where: { id: responseId },
      data: {
        responseData: JSON.stringify({
          ...surveyData,
          submittedAt: new Date().toISOString(),
          status: 'completed'
        }),
        npsScore,
        csatScore,
        cesScore,
        completedAt: new Date()
      }
    })
    
    console.log('✅ Survey completed:', {
      responseId,
      type: response.survey.type,
      score: npsScore || csatScore || cesScore
    })
    
    return NextResponse.json({
      success: true,
      message: 'Survey submitted successfully',
      data: {
        id: updatedResponse.id,
        score: npsScore || csatScore || cesScore,
        type: response.survey.type
      }
    })
    
  } catch (error) {
    console.error('❌ Survey submission error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Unable to submit survey. Please try again.'
      },
      { status: 500 }
    )
  }
}
