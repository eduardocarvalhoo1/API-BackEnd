import fs from "fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET;
const usersFile = "./data/users.json";
let users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));

export const register = (req, res) => {
  const { username, password, name, role } = req.body;

  if (!username || !password || !name || !role) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: "Usuário com este username já existe" });
  }

  const newUser = { username, password, name, role };
  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users));

  res.status(201).json({ message: "Usuário registrado com sucesso", user: newUser });
};

export const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);
  if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

  const token = jwt.sign({ username: user.username, name: user.name, role: user.role }, secretKey, { expiresIn: process.env.JWT_TIME });

  res.json({ message: "Login bem-sucedido", token });
};

export const createAdmin = (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acesso negado" });
  }

  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: "Usuário com este username já existe" });
  }

  const newAdmin = { username, password, name, role: "admin" };
  users.push(newAdmin);
  fs.writeFileSync(usersFile, JSON.stringify(users));

  res.status(201).json({ message: "Administrador criado com sucesso", user: newAdmin });
};

export const deleteUser = (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acesso negado" });
  }

  const { username } = req.params;
  const userIndex = users.findIndex(user => user.username === username);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  const deletedUser = users.splice(userIndex, 1);
  fs.writeFileSync(usersFile, JSON.stringify(users));

  res.json({ message: "Usuário excluído com sucesso" });
};

export const updateUser = (req, res) => {
  const { name, password } = req.body;

  const userIndex = users.findIndex(user => user.username === req.user.username);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  if (name) users[userIndex].name = name;
  if (password) users[userIndex].password = password;

  fs.writeFileSync(usersFile, JSON.stringify(users));

  res.json({ message: "Dados atualizados com sucesso", user: users[userIndex] });
};

export const install = (req, res) => {
  const adminExists = users.some(user => user.role === 'admin');
  if (adminExists) {
    return res.status(400).json({ message: "Usuário administrador já existe" });
  }

  const adminUser = {
    username: "admin",
    password: "admin123",
    name: "Administrador",
    role: "admin"
  };

  users.push(adminUser);
  fs.writeFileSync(usersFile, JSON.stringify(users));

  res.status(201).json({ message: "Usuário administrador criado com sucesso", user: adminUser });
};
