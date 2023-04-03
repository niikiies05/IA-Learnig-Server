## Project launch
#### 1 - Install dependencies
```bash
npm i
```
#### 2 - Create .env file & allocate value to variables
```bash
cp .env.example .env
```
#### 3 - Commands for installing packages
```bash
npm i -D typescript tsc-watch eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin @types/node @types/express
npm i express dotenv

npm i module-alias

npm i mongoose compression cors morgan helmet

npm i -D @types/compression @types/cors @types/morgan

npm i -D @types/jsonwebtoken @types/bcrypt
```
#### 4 - Start the server
```bash
npm run dev
```
