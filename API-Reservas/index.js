import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import { loadReservas } from "./services/reservasService.js";

import swaggerUi from 'swagger-ui-express';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Carregar usuários do arquivo JSON
let users = [];
const usersFile = "./data/users.json";
if (fs.existsSync(usersFile)) {
  users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
} else {
  fs.writeFileSync(usersFile, JSON.stringify(users));
}

const reservas = loadReservas();
app.locals.reservas = reservas;

// Carregar documentação Swagger
const swaggerFilePath = path.resolve('swagger-output.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf-8'));

// Usar rotas
app.use("/auth", authRoutes);
app.use("/reservas", reservaRoutes);

// Configurar Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
