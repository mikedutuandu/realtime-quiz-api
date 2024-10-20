# Quiz Application System Design

## Table of Contents
1. [Architecture Diagram](#1-architecture-diagram)
2. [Component Description](#2-component-description)
3. [Data Flow](#3-data-flow)
4. [Technologies and Tools](#4-technologies-and-tools)
5. [Database Diagram](#5-database-diagram)
6. [Advanced Features and Improvements](#6-advanced-features-and-improvements-planned-for-future-implementation)
7. [Deployment](#7-deployment)
8. [Demo Quiz Application](#8-demo-quiz-application)

## 1. Architecture Diagram


![infra-quiz-app-digram.png](./doc/infra-quiz-app-digram.png "infra-quiz-app-digram.png")


- **Client (Frontend)**: Next.js web app for user interactions
- **WebSocket Server**: NestJS server for real-time communications
- **REST API Server**: NestJS server for user and quiz management
- **Database**: MySQL for persistent storage
- **In-Memory Cache**: Redis for fast data retrieval
- **AWS ECS Cluster**: Deployment of backend infrastructure
- **AWS Amplify**: Hosting for frontend web app

## 2. Component Description

### Client (Next.js)
- **Purpose**: User interface for quiz interactions
- **Functionality**:
  - Display quizzes and details
  - Enable user interactions
  - Show real-time leaderboards

### WebSocket Server (NestJS)
- **Purpose**: Manage real-time communication
- **Functionality**:
  - Handle join-quiz and submit-answer events
  - Broadcast leaderboard updates

### REST API Server (NestJS)
- **Purpose**: Manage users, quizzes, and sessions
- **Functionality**:
  - User creation and management
  - Quiz retrieval and session creation
  - Data persistence to MySQL

### MySQL Database
- **Purpose**: Persistent data storage
- **Functionality**:
  - Store quiz metadata, user details, scores, and session history

### Redis (In-Memory Cache)
- **Purpose**: Fast data access for real-time features
- **Functionality**:
  - Cache active sessions and scores
  - Support quick leaderboard updates

### AWS ECS (CDK Deployment)
- **Purpose**: Backend infrastructure deployment
- **Functionality**:
  - Scalable container management for NestJS services

### AWS Amplify
- **Purpose**: Frontend hosting
- **Functionality**:
  - Scalable and reliable web app serving

## 3. Data Flow

### User Creation
1. User inputs name on web app
2. Client sends create user request to REST API
3. API returns userID, stored as login token

### Joining a Quiz
1. Client fetches quiz list from REST API
2. User selects quiz, client creates session
3. Client connects to WebSocket, emits join-quiz event
4. Server adds user to session, updates leaderboard

### Submitting an Answer
1. Client emits submit-answer event via WebSocket
2. Server processes answer, updates Redis score
3. Server recalculates and broadcasts updated leaderboard

### Real-Time Leaderboard Updates
- WebSocket server sends leaderboard updates on answer submissions

## 4. Technologies and Tools

| Technology | Purpose | Reasoning |
|------------|---------|-----------|
| NestJS | Backend API & WebSocket Server | Modular structure, TypeScript support, real-time features |
| MySQL | Database | Strong consistency, relational storage for structured data |
| Redis | In-Memory Cache | Fast read/write for real-time data and caching |
| Next.js | Frontend Framework | React-based, great for interactive web apps |
| AWS ECS | Container Management & Deployment | Scalable microservices deployment |
| AWS Amplify | Frontend Deployment | Easy setup, scalable and reliable hosting |

---


## 5. Database Diagram
![db-diagram.png](./doc/db-diagram.png "db-diagram.png")

## 6. Advanced Features and Improvements (Planned for Future Implementation)

### 1. Authentication and Authorization
* **User Registration & Login**: Allows users to register and log in using email and password. Implements JWT-based authentication for secure API access.
* **Third-Party Login (OAuth 2.0)**: Supports Google and Facebook login for a seamless user experience.

### 2. Admin Panel
* **Quiz Management**: Admins can create, update, and delete quizzes easily through an intuitive interface.
* **User Management**: View user details, reset passwords, and assign roles or permissions.
* **Session & Leaderboard Management**: Monitor ongoing quiz sessions, forcefully close sessions if needed, and manage or reset leaderboards.
* **Analytics & Reports**: Provides insights into user activity, most popular quizzes, and more. Supports CSV export of results and leaderboards.

### 3. Redis Integration
* **Session Caching**: Caches active quiz sessions for quick retrieval and improved response times.
* **Real-Time Leaderboard**: Stores leaderboard data in Redis to ensure fast updates and retrieval.
* **Rate Limiting**: Protects the system from abuse by limiting excessive API requests on critical routes.

## 7. Deployment

### CI/CD 
- Git action

### Run on local directly
```
  npm run install
  npm run start:dev
```

### Run on local by docker compose
```
  docker-compose -f docker-compose.yml up -d
```
### Deploy to prod 

[Deployment guide to ECS AWS by CDK Typescript](cdk/README.md)

## 8. Demo quiz application

+ API: https://quiz-api.mikedutuandu.com/
+ WEB APP: https://quiz-app.mikedutuandu.com/
+ API DOC: https://quiz-api.mikedutuandu.com/swagger
```
swagger user: dev
swagger pass: 123456aA@
```
