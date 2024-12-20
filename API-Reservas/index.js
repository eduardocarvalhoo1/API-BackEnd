import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

import authRoutes from "./routes/authRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import { loadReservas } from "./services/reservasService.js";

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

// Usar rotas
app.use("/auth", authRoutes);
app.use("/reservas", reservaRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
