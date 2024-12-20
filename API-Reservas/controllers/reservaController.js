import { loadReservas, saveReservas } from "../services/reservasService.js";

let reservas = loadReservas();
/*const reservas = [
    // As reservas iniciais
  ];*/
  
  export const getRandomReserva = (req, res) => {
    const randomIndex = Math.floor(Math.random() * reservas.length);
    res.json(reservas[randomIndex]);
  };
  
  export const getReservaById = (req, res) => {
    const id = parseInt(req.params.id);
    const foundReserva = reservas.find((reserva) => reserva.id === id);
    res.json(foundReserva);
  };
  
  export const getReservaByType = (req, res) => {
    const type = req.query.type;
    const filteredActivities = reservas.filter((reserva) => reserva.reservaType === type);
    res.json(filteredActivities);
  };
  
  export const getReservaByDate = (req, res) => {
    try {
      const date = req.params.date;
      const foundReserva = reservas.find((reserva) => reserva.reservaDate === date);
  
      if (!foundReserva) {
        throw new Error("Reserva não encontrada para a data especificada.");
      }
  
      res.json(foundReserva);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  export const createReserva = (req, res) => {
    const newReserva = {
      id: reservas.length + 1,
      reservaName: req.body.name,
      reservaType: req.body.type,
      reservaDate: req.body.date,
    };
    reservas.push(newReserva);

    saveReservas(reservas);

    res.json(newReserva);
  };
  
  export const updateReserva = (req, res) => {
    const id = parseInt(req.params.id);
    const replacementReserva = {
      id: id,
      reservaName: req.body.name,
      reservaType: req.body.type,
      reservaDate: req.body.date,
    };
  
    const searchIndex = reservas.findIndex((reserva) => reserva.id === id);
  
    reservas[searchIndex] = replacementReserva;
    
    saveReservas(reservas);

    res.json(replacementReserva);
  };

  export const deleteReservaById = (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = reservas.findIndex((reserva) => reserva.id === id);

    if (searchIndex > -1) {
      reservas.splice(searchIndex, 1);
      saveReservas(reservas);
      res.sendStatus(200);
    } 
    else {
      res
        .sendStatus(404)
        .json({error: `Reserva com id ${id} não encontrada.`});
    }
  };
  