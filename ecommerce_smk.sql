-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Sep 2022 pada 15.14
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_smk`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_levels`
--

CREATE TABLE `tb_levels` (
  `level_id` int(11) NOT NULL,
  `level_nama` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_levels`
--

INSERT INTO `tb_levels` (`level_id`, `level_nama`, `createdAt`, `updatedAt`) VALUES
(1, 'administrator', '2022-09-20 07:13:10', '2022-09-20 07:13:10'),
(2, 'customer', '2022-09-20 07:13:10', '2022-09-20 07:13:10');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_users`
--

CREATE TABLE `tb_users` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_nama` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_hp` varchar(255) DEFAULT NULL,
  `user_image` text DEFAULT NULL,
  `user_status` tinyint(1) DEFAULT NULL,
  `user_level` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_users`
--

INSERT INTO `tb_users` (`user_id`, `user_nama`, `user_email`, `user_password`, `user_hp`, `user_image`, `user_status`, `user_level`, `createdAt`, `updatedAt`) VALUES
('6b6b3f3b-ebe7-4115-9eea-18f4c6cd6553', 'admin', 'admin@carakan.id', '$2a$10$c3Ah5qWNn5ZF5WkIeq2.qecggGfYk/ROFcNbOLf49NXnx5WssAO.K', NULL, NULL, 1, 1, '2022-09-21 08:31:54', '2022-09-21 08:31:54');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tb_levels`
--
ALTER TABLE `tb_levels`
  ADD PRIMARY KEY (`level_id`);

--
-- Indeks untuk tabel `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`),
  ADD KEY `user_level` (`user_level`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tb_users`
--
ALTER TABLE `tb_users`
  ADD CONSTRAINT `tb_users_ibfk_1` FOREIGN KEY (`user_level`) REFERENCES `tb_levels` (`level_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
