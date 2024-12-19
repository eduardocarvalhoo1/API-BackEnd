import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
//const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(bodyParser.urlencoded({ extended: true }));

// Pega um reserva aleatoria
app.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * reservas.length);
  res.json(reservas[randomIndex]);
});

// Pega uma reserva especifica com base no id
app.get("/reservas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundreserva = reservas.find((reserva) => reserva.id === id);
  res.json(foundreserva);
});

// Pega uma reserva baseado no tipo do quarto
app.get("/filter", (req, res) => {
  const type = req.query.type;
  const filteredActivities = reservas.filter((reserva) => reserva.reservaType === type);
  res.json(filteredActivities);
});

// Pega uma reserva baseada na data
app.get("/reservas/date/:date", (req, res) => {
try {
    const date = req.params.date; 
    const foundReserva = reservas.find((reserva) => reserva.dataReserva === date);

    if (!foundReserva) {
    throw new Error("Reserva não encontrada para a data especificada.");
    }

    res.json(foundReserva);
} 
catch (error) {
    res.status(404).json({ message: error.message });
    }
});
  

//4. POST a new reservas
app.post("/reservas", (req, res) => {
  const newReserva = {
    id: reservas.length + 1,
    reservaName: req.body.name,
    reservaType: req.body.type,
  };
  reservas.push(newReserva);
  res.json(newReserva);
});

//5. PUT a reservas
app.put("/reservas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const replacementReserva = {
    id: id,
    reservaName: req.body.name,
    reservaType: req.body.type,
    reservaDate: req.body.date,
  };

  const searchIndex = reservas.findIndex((reserva) => reserva.id === id);

  reservas[searchIndex] = replacementReserva;
  
  res.json(replacementReserva);
});



//7. DELETE Specific reservas

//8. DELETE All reservass

app.listen(port, () => {
  console.log(`Rodando na porta ${port}.`);
});

var reservas = [
  {
    id: 1,
    reservaName: "Maria Souza",
    reservaDate: "2024-12-25",
    reservaType: "Luxo",
  },
  
  {
    id: 2,
    reservasName: "João Silva",
    reservaDate: "2024-12-26",
    reservaType: "Executivo",
  },
  {
    id: 3,
    reservasName: "Ana Santos",
    reservaDate: "2024-12-27",
    reservaType: "Familiar",
  },
  {
    id: 4,
    reservasName: "Carlos Pereira",
    reservaDate: "2024-12-28",
    reservaType: "Luxo",
  },
  {
    id: 5,
    reservasName: "Mariana Oliveira",
    reservaDate: "2024-12-29",
    reservaType: "Executivo",
  },
  {
    id: 6,
    reservasName: "Rafael Lima",
    reservaDate: "2024-12-30",
    reservaType: "Familiar",
  },
  {
    id: 7,
    reservasName: "Fernanda Costa",
    reservaDate: "2024-12-31",
    reservaType: "Luxo",
  },
  {
    id: 8,
    reservasName: "Lucas Almeida",
    reservaDate: "2025-01-01",
    reservaType: "Executivo",
  },
  {
    id: 9,
    reservasName: "Beatriz Ferreira",
    reservaDate: "2025-01-02",
    reservaType: "Familiar",
  },
  {
    id: 10,
    reservasName: "Gabriel Nunes",
    reservaDate: "2025-01-03",
    reservaType: "Luxo",
  },
  {
    id: 11,
    reservasName: "Larissa Martins",
    reservaDate: "2025-01-04",
    reservaType: "Executivo",
  }
];
