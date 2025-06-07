# IBM Full Stack Developer Capstone Project

Final Project for the Coursera Course:

- Program: IBM Full Stack Software Developer Professional Certificate
- Course: [Full Stack Application Development Capstone Project](https://www.coursera.org/learn/ibm-cloud-native-full-stack-development-capstone?specialization=ibm-full-stack-cloud-developer)

## Getting Started

```bash
cd server

pip install -r requirements.txt

python3 manage.py makemigrations
python3 manage.py migrate

python3 manage.py runserver
```

## Tech Stack

- Django
- React
- Express
- MongoDB
- Flask
- Docker
- Kubernetes

## Packages

- `/server`: Application Server
- `/server/frontend`: Static Pages & SPA [more](./server/frontend)
- `/server/database`: Backend API Server [more](./server/database)
- `/server/djangoapp/microservices`: Sentiment Analyzer [more](./server/djangoapp/microservices)

## Features

- User login and registration
- View the list of dealership
- Filter the list of dealership by state
- View the dealership details
- Submit and view reviews for dealerships
- Admin panel for car management

## System Architecture

```mermaid
C4Container
  title System Container diagram for Car Dealership Service

  Person_Ext(user, "User")

  Person("admin_user", "Admin")

  Container_Boundary(b_app, "Application Server Boundary") {
    Container(spa, "Single Page Application", "React")
    Container(admin, "Admin Site", "Django")
    Container(app, "Application Server", "Django")
    ContainerDb(db, "Database", "RDMS", "Stores user & car data")
  }

  Container_Boundary(b_senti, "Sentiment Analyzer Server Boundary") {
    Container(senti, "Sentiment Analyzer", "Flask")
  }

  Container_Boundary(b_backend, "Backend API Server Boundary") {
    Container(backend, "Backend API Server", "Express")
    ContainerDb(mongo, "Backend Database", "MongoDB", "Stores dealerships & reviews")
  }

  Rel(spa, user, "Delivered", "HTTPS")
  Rel(app, spa, "Delivers")

  Rel(app, backend, "Fetch data", "HTTPS")
  Rel(backend, app, "Send data", "JSON")
  Rel(backend, mongo, "Reads & Writes")

  Rel(app, senti, "Request analyzing text", "HTTPS")
  Rel(senti, app, "Send results", "JSON")

  Rel(admin, admin_user, "Delivered", "HTTPS")
  Rel(app, admin, "Delivers")
  Rel(app, db, "Reads & Writes")

  UpdateRelStyle(spa, user, $textColor="red", $lineColor="red", $offsetX="10")
  UpdateRelStyle(app, spa, $textColor="red", $lineColor="red", $offsetX="5")

  UpdateRelStyle(app, backend, $textColor="orange", $lineColor="orange", $offsetX="-60")
  UpdateRelStyle(backend, app, $textColor="orange", $lineColor="orange", $offsetX="7")
  UpdateRelStyle(backend, mongo, $textColor="orange", $lineColor="orange", $offsetX="-40", $offsetY="15")

  UpdateRelStyle(app, senti, $textColor="orange", $lineColor="orange", $offsetX="-50", $offsetY="-50")
  UpdateRelStyle(senti, app, $textColor="orange", $lineColor="orange", $offsetX="50", $offsetY="15")

  UpdateRelStyle(admin, admin_user, $textColor="blue", $lineColor="blue", $offsetX="10")
  UpdateRelStyle(app, admin, $textColor="blue", $lineColor="blue")
  UpdateRelStyle(app, db, $textColor="blue", $lineColor="blue", $offsetX="-40", $offsetY="15")

  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="2")

```
