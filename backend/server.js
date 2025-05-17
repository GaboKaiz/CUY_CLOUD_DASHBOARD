const express = require("express");
const cors = require("cors");
const connection = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// API GET para obtener los datos (último registro)
app.get("/api/cuy_cloud", (req, res) => {
  const query = "SELECT * FROM cuy_cloud ORDER BY fechahora DESC LIMIT 1";
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0] || {});
  });
});

// API GET para obtener datos históricos (para los gráficos y la tabla)
app.get("/api/cuy_cloud/history", (req, res) => {
  const limit = req.query.limit || 5; // Por defecto, 5 registros
  const query = `SELECT * FROM cuy_cloud ORDER BY fechahora DESC LIMIT ${parseInt(
    limit
  )}`;
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// API POST para insertar datos
app.post("/api/cuy_cloud", (req, res) => {
  const {
    fechahora,
    id_equipo,
    temperatura_aire,
    humedad_aire,
    temperatura_suelo,
    amoniaco,
    ventilacion,
    limpiarpoza,
    temperaturacontrolada,
    humedadcontrolada,
    suelohumedo,
  } = req.body;
  const query =
    "INSERT INTO cuy_cloud (fechahora, id_equipo, temperatura_aire, humedad_aire, temperatura_suelo, amoniaco, ventilacion, limpiarpoza, temperaturacontrolada, humedadcontrolada, suelohumedo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    fechahora,
    id_equipo,
    temperatura_aire,
    humedad_aire,
    temperatura_suelo,
    amoniaco,
    ventilacion,
    limpiarpoza,
    temperaturacontrolada,
    humedadcontrolada,
    suelohumedo,
  ];

  connection.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Datos insertados correctamente" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
