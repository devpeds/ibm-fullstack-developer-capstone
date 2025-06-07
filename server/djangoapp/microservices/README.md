# Sentiment Analyzer

Sentiment Analyzer API Server

## Getting Started

```bash
docker build . -t senti_analyzer
docker run -p 5050:5000 senti_analyzer
```

## API

- **[GET]** `/analyze/:text`

  Response

  ```json
  {
    "sentiment": "string"
  }
  ```
