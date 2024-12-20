import { loadReservas, saveReservas } from "../services/reservasService.js";

let reservas = loadReservas();
/*const reservas = [
    // As reservas iniciais
  ];*/
  
  /*export const getRandomReserva = (req, res) => {
    const randomIndex = Math.floor(Math.random() * reservas.length);
    res.json(reservas[randomIndex]);
  };*/
  export const getRandomReserva = async (req, res) => {
    if (reservas.length === 0) {
      return res.status(404).json({ message: "Nenhuma reserva disponível no momento." });
    }
    const randomIndex = Math.floor(Math.random() * reservas.length);
    res.json({ message: "Reserva encontrada com sucesso.", data: reservas[randomIndex] });
  };
  
  export const getReservaById = async (req, res) => {
    const id = parseInt(req.params.id);
    const foundReserva = reservas.find((reserva) => reserva.id === id);
    
    if (!foundReserva) {
      return res.status(404).json({ message: `Reserva com ID ${id} não encontrada.` });
    }
  
    res.json(foundReserva);
  };

export const getReservaByType = async (req, res) => {
  const type = req.query.type;
  if (!type) {
    return res.status(400).json({ message: "Tipo de reserva não fornecido." });
  }

  const filteredReservas = reservas.filter((reserva) => reserva.reservaType === type);
  res.json(filteredReservas);
};
  
  export const getReservaByDate = async (req, res) => {
      const date = req.params.date; // Obtém a data da rota
      const foundReservas = reservas.filter((reserva) => reserva.reservaDate === date); // Filtra todas as reservas com a data
  
      if (foundReservas.length === 0) {
        return res.status(404).json({ message: `Reserva para ${date} não encontrada.` });
      }
  
      res.json(foundReservas); 
  };
  
  
  export const createReserva = async (req, res) => {

    const { name, type, date } = req.body;

     
    if (!name || !type || !date) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }
    const newReserva = {
      id: reservas.length + 1,
      reservaName: req.body.name,
      reservaType: req.body.type,
      reservaDate: req.body.date,
    };
    reservas.push(newReserva);

    saveReservas(reservas);

    res.status(201).json({
      message: "Reserva criada com sucesso.",
      data: newReserva
    });
  };
  
  export const updateReserva = async (req, res) => {
    const id = parseInt(req.params.id);

    const { name, type, date } = req.body;

    if (!name || !type || !date) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const replacementReserva = {
      id: id,
      reservaName: req.body.name,
      reservaType: req.body.type,
      reservaDate: req.body.date,
    };
  
    const searchIndex = reservas.findIndex((reserva) => reserva.id === id);

    if (searchIndex === -1) {
      return res.status(404).json({ message: `Reserva com ID ${id} não encontrada.` });
    }
  
    reservas[searchIndex] = replacementReserva;
    
    saveReservas(reservas);

    res.json({
      message: "Reserva atualizada com sucesso.",
      data: replacementReserva
    });
  };

  export const deleteReservaById = async (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = reservas.findIndex((reserva) => reserva.id === id);

    if (searchIndex === -1) {
      return res.status(404).json({ message: `Reserva com ID ${id} não encontrada.` });
    }
  
    reservas.splice(searchIndex, 1);
    saveReservas(reservas);
  
    res.status(200).json({ message: `Reserva com ID ${id} deletada com sucesso.` });
  };
  