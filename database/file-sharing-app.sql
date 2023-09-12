-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2023 at 12:28 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `file-sharing-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `uploaded_files`
--

CREATE TABLE `uploaded_files` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `upload_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `username` varchar(50) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `user_role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `uploaded_files`
--

INSERT INTO `uploaded_files` (`id`, `user_id`, `filename`, `upload_date`, `username`, `file_path`, `user_role`) VALUES
(105, 39, 'Vasileios-Pafiliaris-Web-Dev-CV.pdf', '2023-09-12 10:15:20', 'straktormedia', '../uploads/user_39/Vasileios-Pafiliaris-Web-Dev-CV.pdf', 'user'),
(106, 39, 'certificate.pdf', '2023-09-12 10:16:29', 'straktormedia', '../uploads/user_39/certificate.pdf', 'user'),
(107, 40, 'Web_Developer_Case Study.pdf', '2023-09-12 10:17:41', 'vasilis', '../uploads/user_40/Web_Developer_Case Study.pdf', 'admin'),
(108, 40, 'Git-Github.pdf', '2023-09-12 10:18:20', 'vasilis', '../uploads/user_40/Git-Github.pdf', 'admin'),
(109, 41, 'Bleximo Notes  (DLFRIP) (3).pdf', '2023-09-12 10:19:37', 'vasilis_user', '../uploads/user_41/Bleximo Notes  (DLFRIP) (3).pdf', 'user'),
(121, 40, 'github.png', '2023-09-12 10:28:04', 'vasilis', '../uploads/user_40/github.png', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`) VALUES
(39, 'straktormedia', 'straktormedia@gmail.com', '$2y$10$waXueFurybQasKA1y5dffeFqBLEwJ4iDjKMjjxeVfscQS85uxK3fG', 'user'),
(40, 'vasilis', 'vasilisound@gmail.com', '$2y$10$5BWwdLNFqyWpUfNGriVE.emdDuXEXcRe.JoHbtmqwQBRieLcdEGcO', 'admin'),
(41, 'vasilis_user', 'vasilisound@outlook.com.gr', '$2y$10$rp64Cm6yvvwv72Go1lcRsuPRBrfgxcLJcIC7N3IquyzDFneiPJOhq', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `uploaded_files`
--
ALTER TABLE `uploaded_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `uploaded_files`
--
ALTER TABLE `uploaded_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `uploaded_files`
--
ALTER TABLE `uploaded_files`
  ADD CONSTRAINT `uploaded_files_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
