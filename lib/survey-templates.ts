export const NPS_TEMPLATE = {
  "title": "Net Promoter Score",
  "description": "Help us understand your experience",
  "showProgressBar": "top",
  "pages": [
    {
      "name": "nps-page",
      "elements": [
        {
          "type": "rating",
          "name": "nps_score",
          "title": "On a scale of 0-10, how likely are you to recommend our service to a friend or colleague?",
          "isRequired": true,
          "rateMin": 0,
          "rateMax": 10,
          "rateStep": 1
        },
        {
          "type": "comment",
          "name": "nps_reason",
          "title": "What's the main reason for your score?",
          "placeholder": "Please share your thoughts...",
          "maxLength": 500
        }
      ]
    }
  ]
}

export const CSAT_TEMPLATE = {
  "title": "Customer Satisfaction Survey"
}
