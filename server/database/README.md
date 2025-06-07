# Backend API Server

Car Dealership Service API Server

## Getting Started

```bash
docker build . -t nodeapp
docker-compose up
```

## API

1. **[GET]** `/fetch_reviews`
2. **[GET]** `/fetch_reviews/dealer/:id`
3. **[GET]** `/fetch_dealers`
4. **[GET]** `/fetch_dealers/:state`
5. **[GET]** `/fetch_dealer/:id`
6. **[POST]** `/insert_review`
