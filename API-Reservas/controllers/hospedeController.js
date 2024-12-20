import fs from "fs";

const hospedesFile = "./data/hospedes.json";
let hospedes = JSON.parse(fs.readFileSync(hospedesFile, "utf-8"));

export const getAllHospedes = (req, res) => {
  res.json(hospedes);
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
};
