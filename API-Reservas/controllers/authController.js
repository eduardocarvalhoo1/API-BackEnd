import fs from "fs";
import jwt from "jsonwebtoken";

const secretKey = "seu-segredo-jwt";
const usersFile = "./data/users.json";
let users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));

export const register = (req, res) => {
  const { username, password, name, role } = req.body;

  if (!username || !password || !name || !role) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  const newUser = { id: users.length + 1, username, password, name, role };
  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users));

  res.status(201).json({ message: "Usuário registrado com sucesso", user: newUser });
};

export const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: "1h" });

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

  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  const newAdmin = { id: users.length + 1, username, password, name, role: "admin" };
  users.push(newAdmin);
  fs.writeFileSync(usersFile, JSON.stringify(users));

  res.status(201).json({ message: "Administrador criado com sucesso", user: newAdmin });
};

export const deleteUser = (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acesso negado" });
  }

  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  if (users[userIndex].role === "admin") {
    return res.status(403).json({ message: "Não é permitido excluir outros administradores" });
  }

  users.splice(userIndex, 1);
  fs.writeFileSync(usersFile, JSON.stringify(users));

  res.json({ message: "Usuário excluído com sucesso" });
};

export const updateUser = (req, res) => {
  const { name, password } = req.body;

  const userIndex = users.findIndex((user) => user.id === req.user.id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  if (name) users[userIndex].name = name;
  if (password) users[userIndex].password = password;

  fs.writeFileSync(usersFile, JSON.stringify(users));

  res.json({ message: "Dados atualizados com sucesso" });
};
