# API básica com CI/CD via GitHub Actions.
O objetivo deste projeto é construir uma aplicação Node.js simples, exposta via API REST (Express), com suporte completo a integração contínua (CI) utilizando GitHub Actions e containerização via Docker.

### Servidor (Express) - app.js

```bash
    import express from 'express';
    const app = express();

    app.get('/', (req, res) => {
    res.json({ message: "Hello, CI/CD Node!" });
    });

    const PORT = process.env.PORT || 5000;
    if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    export default app;
```

### Testes Automatizados - test/app.test.js

```bash
    import request from 'supertest';
    import app from '../app.js';

    describe('GET /', () => {
    it('should return Hello message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe("Hello, CI/CD Node!");
    });
    });
```

### Dockerfile

```bash
    FROM node:20-alpine

    WORKDIR /app

    COPY package*.json ./
    RUN npm install

    COPY . .

    CMD ["npm", "start"]
```

### Pipeline - .github/workflows/ci-cd.yml

```yml
name: CI/CD Node App

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]

jobs:
  build-test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout código
      uses: actions/checkout@v3

    - name: Instalar Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'

    - name: Instalar dependências
      run: npm install

    - name: Rodar testes
      run: npm test
```

### Empacotamento e Execução com Docker

```bash
    docker build -t simple-ci-cd-node .
    docker run -p 5000:5000 simple-ci-cd-node
```