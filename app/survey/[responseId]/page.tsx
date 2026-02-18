'use client'

import { useState, useEffect } from 'react'
import { Survey } from 'survey-react-ui'
import { Model } from 'survey-core'

const surveyCSS = `
  .sd-root-modern {
    background: white !important;
    padding: 2rem !important;
    border-radius: 12px !important;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
  }
  .sd-question__title {
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    color: #1f2937 !important;
    margin-bottom: 1rem !important;
  }
  .sd-rating__item {
    background: #f3f4f6 !important;
    border: 2px solid #e5e7eb !important;
    margin: 0 0.25rem !important;
  }
  .sd-rating__item:hover {
    border-color: #3b82f6 !important;
  }
  .sd-rating__item--selected {
    background: #3b82f6 !important;
    border-color: #3b82f6 !important;
    color: white !important;
  }
  .sd-btn {
    background: #3b82f6 !important;
    color: white !important;
    padding: 0.75rem 2rem !important;
    border-radius: 8px !important;
    font-weight: 600 !important;
    border: none !important;
  }
  .sd-btn:hover {
    background: #2563eb !important;
  }
`

interface SurveyData {
  id: string
  survey: {
    id: string
    name: string
    type: string
    surveyJson: any
  }
  organization: {
    name: string
    primaryColor: string
    logo?: string
  }
  contactEmail?: string
}

export default function SurveyPage({ params }: { params: Promise<{ responseId: string }> }) {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadSurvey()
  }, [])

  const loadSurvey = async () => {
  try {
    setLoading(true)
    const resolvedParams = await params
    const response = await fetch(`/api/survey/${resolvedParams.responseId}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to load survey')
      }

      if (result.success) {
        setSurveyData(result.data)
      } else {
        throw new Error(result.message || 'Survey not found')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load survey')
    } finally {
      setLoading(false)
    }
  }

  const handleSurveyComplete = async (sender: Model) => {
    try {
      setSubmitting(true)
      const surveyResult = sender.data
      const resolvedParams = await params

      const response = await fetch(`/api/survey/${resolvedParams.responseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyResult)
      })

      const result = await response.json()

      if (result.success) {
        setCompleted(true)
        console.log('✅ Survey completed:', result.data)
      } else {
        throw new Error(result.message || 'Failed to submit survey')
      }
    } catch (err) {
      alert(`Error submitting survey: ${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error('❌ Survey submission error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading survey...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Survey Unavailable</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Completed state
  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-xl p-8 text-center">
          <div className="text-green-500 text-6xl mb-6">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Thank You!
          </h1>
          <p className="text-gray-600 mb-6">
            Your feedback has been submitted successfully. We appreciate you taking the time to help us improve our service.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">
              Survey completed for <strong>{surveyData?.organization.name}</strong>
            </p>
          </div>
          <p className="text-xs text-gray-400">
            You can safely close this window.
          </p>
        </div>
      </div>
    )
  }

  if (!surveyData) {
    return null
  }

  // Create survey model
  const survey = new Model(surveyData.survey.surveyJson)
  
  // Apply organization branding
  survey.applyTheme({
    "cssVariables": {
      "--sjs-primary-backcolor": surveyData.organization.primaryColor,
      "--sjs-primary-forecolor": "white",
      "--sjs-base-unit": "8px",
      "--sjs-corner-radius": "8px"
    }
  })

  // Configure survey
  survey.focusFirstQuestionAutomatic = false
  survey.showProgressBar = "top"
  survey.progressBarType = "buttons"
  
  // Handle completion
  survey.onComplete.add(handleSurveyComplete)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              {surveyData.organization.logo && (
                <img 
                  src={surveyData.organization.logo} 
                  alt={surveyData.organization.name}
                  className="h-8 mb-2"
                />
              )}
              <h1 className="text-2xl font-bold text-gray-900">
                {surveyData.survey.name}
              </h1>
              <p className="text-gray-600">
                {surveyData.organization.name}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {surveyData.survey.type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Survey Container */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          {submitting && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Submitting...</p>
              </div>
            </div>
          )}
          <Survey model={survey} />
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <p className="text-center text-xs text-gray-400">
          Powered by {surveyData.organization.name} • Built with Celeru Survey Platform
        </p>
      </div>
    </div>
  )
}
