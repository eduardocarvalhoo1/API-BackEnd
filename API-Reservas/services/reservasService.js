import fs from "fs";

const reservasFile = "./data/reservas.json";

// Carrega as reservas do arquivo JSON
export const loadReservas = () => {
  if (fs.existsSync(reservasFile)) {
    return JSON.parse(fs.readFileSync(reservasFile, "utf-8"));
  } else {
    fs.writeFileSync(reservasFile, JSON.stringify([], null, 2));
    return [];
  }
};

// Salva as reservas no arquivo JSON
export const saveReservas = (reservas) => {
  fs.writeFileSync(reservasFile, JSON.stringify(reservas, null, 2));
};
