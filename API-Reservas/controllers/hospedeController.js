/*import fs from "fs";
import { paginate } from "../services/pags.js";

const hospedesFile = "./data/hospedes.json";
let hospedes = JSON.parse(fs.readFileSync(hospedesFile, "utf-8"));

export const getAllHospedes = (req, res) => {
  try {
    const { limite, pagina } = req.query; 

    const paginatedHospedes = paginate(hospedes, limite, pagina);

    if (paginatedHospedes.length === 0) {
      return res.status(404).json({
        message: "Nenhum hóspede encontrado para os parâmetros fornecidos."
      });
    }

    res.status(200).json({
      message: "Hóspedes encontrados com sucesso.",
      data: paginatedHospedes
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const getHospedeById = (id) => {
  return hospedes.find(hospede => hospede.id === id);
};

export const getHospedeByCpf = (cpf) => {
  return hospedes.find(hospede => hospede.cpf === cpf);
};

export const createHospede = (req, res) => {
  const { cpf, nome, email, telefone } = req.body;

  if (!cpf || !nome || !email || !telefone) {
    return res.status(400).json({ message: 'CPF, nome, email e telefone são obrigatórios' });
  }

  if (cpf.length !== 11) {
    return res.status(400).json({ message: "O CPF deve ter 11 números" });
  }

  if (getHospedeByCpf(cpf)) {
    return res.status(400).json({ message: "Hóspede com este CPF já existe" });
  }

  const newHospede = { id: hospedes.length + 1, cpf, nome, email, telefone };
  hospedes.push(newHospede);
  fs.writeFileSync(hospedesFile, JSON.stringify(hospedes));
  res.status(201).json(newHospede);
};

export const updateHospede = (req, res) => {
  const id = parseInt(req.params.id);
  const hospedeIndex = hospedes.findIndex(hospede => hospede.id === id);
  if (hospedeIndex === -1) return res.status(404).json({ message: 'Hóspede não encontrado' });

  const { nome, email, telefone } = req.body;
  if (nome) hospedes[hospedeIndex].nome = nome;
  if (email) hospedes[hospedeIndex].email = email;
  if (telefone) hospedes[hospedeIndex].telefone = telefone;

  fs.writeFileSync(hospedesFile, JSON.stringify(hospedes));
  res.json(hospedes[hospedeIndex]);
};

export const deleteHospede = (req, res) => {
  const id = parseInt(req.params.id);
  const hospedeIndex = hospedes.findIndex(hospede => hospede.id === id);
  if (hospedeIndex === -1) return res.status(404).json({ message: 'Hóspede não encontrado' });

  const deletedHospede = hospedes.splice(hospedeIndex, 1);
  fs.writeFileSync(hospedesFile, JSON.stringify(hospedes));
  res.json(deletedHospede[0]);
};*/

import fs from "fs";
import { paginate } from "../services/pags.js";

const hospedesFile = "./data/hospedes.json";
let hospedes = JSON.parse(fs.readFileSync(hospedesFile, "utf-8"));

// Função para obter todos os hóspedes com paginação
export const getAllHospedes = (req, res) => {
  try {
    const { limite, pagina } = req.query;
    const paginatedHospedes = paginate(hospedes, limite, pagina);

    if (paginatedHospedes.length === 0) {
      return res.status(404).json({
        message: "Nenhum hóspede encontrado para os parâmetros fornecidos."
      });
    }

    res.status(200).json({
      message: "Hóspedes encontrados com sucesso.",
      data: paginatedHospedes
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// Função para buscar hóspede pelo ID
export const getHospedeById = (id) => {
  return hospedes.find(hospede => hospede.id === id);
};

// Função para buscar hóspede pelo CPF
export const getHospedeByCpf = (cpf) => {
  return hospedes.find(hospede => hospede.cpf === cpf);
};

// Função para criar um novo hóspede
export const createHospede = async (req, res) => {
  const { cpf, nome, email, telefone } = req.body;

  // Validação já foi feita no middleware 'validateHospede', então podemos ir direto para a criação

  if (getHospedeByCpf(cpf)) {
    return res.status(400).json({ message: "Hóspede com este CPF já existe" });
  }

  const newHospede = { id: hospedes.length + 1, cpf, nome, email, telefone };
  hospedes.push(newHospede);
  fs.writeFileSync(hospedesFile, JSON.stringify(hospedes));

  res.status(201).json({
    message: "Hóspede criado com sucesso",
    data: newHospede
  });
};

// Função para atualizar dados de um hóspede
export const updateHospede = async (req, res) => {
  const id = parseInt(req.params.id);
  const hospedeIndex = hospedes.findIndex(hospede => hospede.id === id);

  if (hospedeIndex === -1) {
    return res.status(404).json({ message: 'Hóspede não encontrado' });
  }

  const { nome, email, telefone } = req.body;

  // Atualiza os campos existentes (não precisa de ifs para verificar se os campos existem)
  if (nome) hospedes[hospedeIndex].nome = nome;
  if (email) hospedes[hospedeIndex].email = email;
  if (telefone) hospedes[hospedeIndex].telefone = telefone;

  fs.writeFileSync(hospedesFile, JSON.stringify(hospedes));

  res.status(200).json({
    message: "Hóspede atualizado com sucesso",
    data: hospedes[hospedeIndex]
  });
};

// Função para deletar um hóspede
export const deleteHospede = async (req, res) => {
  const id = parseInt(req.params.id);
  const hospedeIndex = hospedes.findIndex(hospede => hospede.id === id);

  if (hospedeIndex === -1) {
    return res.status(404).json({ message: 'Hóspede não encontrado' });
  }

  const deletedHospede = hospedes.splice(hospedeIndex, 1);
  fs.writeFileSync(hospedesFile, JSON.stringify(hospedes));

  res.status(200).json({
    message: "Hóspede deletado com sucesso",
    data: deletedHospede[0]
  });
};

