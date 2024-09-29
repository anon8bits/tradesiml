# TradeSiml

A live version of this app is deployed [here](https://tradesiml.tech/).

The backend repository can be found [here](https://github.com/anon8bits/tradesiml-backend).

## Introduction

**TradeSiml** is a paper trading platform designed to simulate stock trading without risking real money. It allows users to practice and develop their trading strategies in a risk-free environment using virtual currency. Built with a React.js frontend and Node.js/Express.js backend, it connects to a MongoDB database for persistent storage of user data and trade history.

## Features

- **User Authentication**: Secure sign-up and login system with Auth0.
- **Portfolio Management**: Users can create and manage a portfolio, track investments, and monitor performance.
- **Real-time Market Data**: Fetches live stock prices through third-party APIs to simulate real-time trading experiences.
- **Buy/Sell Trades**: Allows users to execute simulated buy and sell orders, reflecting in their portfolio and balance.
- **Transaction History**: Users can view detailed trade history, including past buys, sells, and portfolio performance.
- **Responsive Design**: Fully responsive UI to ensure seamless experience across devices.

## Tech Stack

- **Frontend**: React.js (functional components with hooks for state management)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (NoSQL for scalable and flexible data storage)
- **Deployment**: Frontend deployed on Netlify, Backend on Microsoft Azure

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB setup for local development (or use a remote MongoDB instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/anon8bits/tradesiml.git
   ```

2. Clone the backend repository in other directory:
  ```bash
  git clone https://github.com/anon8bits/tradesiml-backend.git
  ```
3. Install dependencies for both frontend and backend
  ```bash
  npm install
  ```
4. Create a `.env` file and add required variables (MongoDB URI, backend URL, [Stock API Key](https://rapidapi.com/suneetk92/api/latest-stock-price)).

5. Run the development server
  ```npm start```






