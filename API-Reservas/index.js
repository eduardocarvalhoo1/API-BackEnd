import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import hospedeRoutes from "./routes/hospedeRoutes.js";
import { loadReservas } from "./services/reservasService.js";

import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

// Carregar hóspedes do arquivo JSON
let hospedes = [];
const hospedesFile = "./data/hospedes.json";
if (fs.existsSync(hospedesFile)) {
  hospedes = JSON.parse(fs.readFileSync(hospedesFile, "utf-8"));
} else {
  fs.writeFileSync(hospedesFile, JSON.stringify(hospedes));
}

const reservas = loadReservas();
app.locals.reservas = reservas;
app.locals.hospedes = hospedes;

// Carregar documentação Swagger
const swaggerFilePath = path.resolve('swagger-output.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf-8'));

// Usar rotas
app.use("/auth", authRoutes);
app.use("/reservas", reservaRoutes);
app.use("/hospedes", hospedeRoutes); // Nova rota de hóspedes

// Configurar Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
