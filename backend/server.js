const express = require("express");
const cors = require("cors");
const connection = require("./db");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// GET: Último registro
app.get("/api/cuy_cloud", (req, res) => {
  const query = "SELECT * FROM cuy_cloud ORDER BY fechahora DESC LIMIT 1";
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || {});
  });
});

// GET: Historial (con filtro por fecha)
app.get("/api/cuy_cloud/history", (req, res) => {
  const limit = req.query.limit || 5;
  const date = req.query.fechahora;
  let query = `SELECT * FROM cuy_cloud`;
  let queryParams = [];

  if (date) {
    query += ` WHERE DATE(fechahora) = ?`;
    queryParams.push(date);
  }

  query += ` ORDER BY fechahora DESC LIMIT ?`;
  queryParams.push(parseInt(limit));

  connection.query(query, queryParams, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST: Crear registro
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
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: "Datos insertados correctamente",
      id: results.insertId,
    });
  });
});

// PUT: Actualizar registro
app.put("/api/cuy_cloud/:id", (req, res) => {
  const { id } = req.params;
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
    "UPDATE cuy_cloud SET fechahora = ?, id_equipo = ?, temperatura_aire = ?, humedad_aire = ?, temperatura_suelo = ?, amoniaco = ?, ventilacion = ?, limpiarpoza = ?, temperaturacontrolada = ?, humedadcontrolada = ?, suelohumedo = ? WHERE id = ?";
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
    id,
  ];

  connection.query(query, values, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Registro no encontrado" });
    res.json({ message: "Datos actualizados correctamente" });
  });
});

// DELETE: Eliminar registro
app.delete("/api/cuy_cloud/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM cuy_cloud WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Registro no encontrado" });
    res.json({ message: "Registro eliminado correctamente" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
