# 4CITE_FRONTEND

LE front-end de l'application akkordHotel avec des tests Cypress e2e frontend test avec pipeline CI/CD.Ce dépôt contient uniquement le code du backend.

## Prerequisites
 **Langage**:
- Node.js (version 14.x or higher)
- npm (version 6.x or higher) or yarn (version 1.x or higher)

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/abdoulWaris/4CITE_FRONTEND.git
   cd 4CITE_FRONTEND 
   ```
2. Install dependencies
   ```sh
   npm install
   #or
   yarn install 
```
3. Start the development server:
npm start #or yarn start
```
4. Open your browser and go to `http://localhost:3000`

## Running Cypress End-to-End Tests
To run the cyress end-to-end tests, follow these steps:

1.Ensure the development server is running
```sh
npm start
#or
yarn start
```
2.Ensure that cypress is installed:
```sh
npm install cypress --save-dev
```
3. Open cypress test runner:
```sh
   npx cypress open
```
   ## Alternative

You can run the tests in headless mode:
```sh
npm run cypress:run
# or
yarn cypress:run
```
**Note:** La pipeLine est fait en 3 steps: Build->Test->Deploy
