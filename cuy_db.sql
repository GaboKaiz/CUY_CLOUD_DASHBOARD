-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2025 a las 23:50:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12


--Nombre de la base de datos: `cuy_db`
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cuy_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuy_cloud`
--

CREATE TABLE `cuy_cloud` (
  `id` int(11) NOT NULL,
  `fechahora` datetime DEFAULT NULL,
  `id_equipo` double DEFAULT NULL,
  `temperatura_aire` double DEFAULT NULL,
  `humedad_aire` double DEFAULT NULL,
  `temperatura_suelo` double DEFAULT NULL,
  `amoniaco` double DEFAULT NULL,
  `ventilacion` varchar(2) DEFAULT NULL,
  `limpiarpoza` varchar(2) DEFAULT NULL,
  `temperaturacontrolada` varchar(2) DEFAULT NULL,
  `humedadcontrolada` varchar(2) DEFAULT NULL,
  `suelohumedo` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuy_cloud`
--

INSERT INTO `cuy_cloud` (`id`, `fechahora`, `id_equipo`, `temperatura_aire`, `humedad_aire`, `temperatura_suelo`, `amoniaco`, `ventilacion`, `limpiarpoza`, `temperaturacontrolada`, `humedadcontrolada`, `suelohumedo`) VALUES
(2, '2025-05-23 16:26:00', 15, 50, 50, 50, 50, 'SI', 'SI', 'SI', 'SI', 'SI'),
(4, '2025-05-25 21:37:00', 10, 100, 100, 100, 50, 'NO', 'NO', 'NO', 'NO', 'NO'),
(5, '2025-05-17 16:42:00', 5, 25, 25, 25, 25, 'SI', 'NO', 'SI', 'NO', 'NO'),
(6, '2025-05-17 16:43:00', 8, 50, 50, 50, 50, 'SI', 'SI', 'SI', 'SI', 'SI');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cuy_cloud`
--
ALTER TABLE `cuy_cloud`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cuy_cloud`
--
ALTER TABLE `cuy_cloud`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
