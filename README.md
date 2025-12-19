<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is the **Murmurs** full-stack application, built with **NestJS** (backend), **Prisma + MySQL** (database), and **React + Vite + Tailwind CSS** (frontend).


## Compile and run the project

Here's a polished **README.md** file for your project “Murmurs” with clear instructions for setting up and running the full stack (DB, server, frontend):




## 📂 Project Structure

```

Murmurs/
├── db/        # Database setup and Docker Compose
├── server/    # NestJS backend
├── src/       # Frontend React app

````

---

## 🛠 Prerequisites

- Node.js
- npm
- Docker & Docker Compose
- MySQL (optional if using Docker)

---

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/tareqhasan382/murmur-app.git
cd murmur-app
````

### 2. Start Database

```bash
cd db
docker-compose up -d
```

This will start a MySQL container with the required database.

---

### 3. Setup & Run Server

```bash
cd ../server
cp .env.example .env   # Add your environment variables
npm install
npm run start:dev
```

The server will run at: `http://localhost:8000` (default)

---

### 4. Setup & Run Frontend

```bash
cd ../src
cp .env.example .env   # Add your frontend environment variables
npm install
npm run dev
```

The frontend will run at: `http://localhost:5173` (default Vite dev server)

---

## ⚙ Environment Variables

### Backend `.env`

```
NODE_ENV="development"
PORT=8000
USER=murmur_user
PASSWORD=murmur_pass
HOST=localhost
DB_PORT=3306
DATABASE_URL="mysql://murmur_user:murmur_pass@localhost:3306/murmur_db"

# Authentication
SALT_ROUND=13
ACCESS_TOKEN_SECRET=your_jwt_access_secret
REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
ACCESS_TOKEN_EXPIREIN='7d'
REFRESH_TOKEN_EXPIREIN='1d'

# SMTP
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password
SMTP_FROM=noreply@example.com
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:5000
```

---

## 📦 Scripts

### Backend (server)

```bash
npm run start       # Start in production
npm run start:dev   # Start in development mode
npm run build       # Build the project
```

### Frontend (src)

```bash
npm run dev         # Start dev server
npm run build       # Build production files
npm run preview     # Preview production build
```

---

## 🧰 Features Implemented

* User registration & login
* JWT authentication
* Password reset via email OTP
* Role-based user management
* Database setup with Prisma & MySQL
* Dockerized database
* Frontend with React, Vite, and Tailwind CSS

---

## 🚀 Notes

* Make sure Docker is running before starting the database.
* Backend and frontend require their own `.env` files.
* API endpoints are prefixed with `/api` by default.
* Frontend communicates with backend via `VITE_API_URL`.

---

## 👨‍💻 Author

Tareq Hasan

---
