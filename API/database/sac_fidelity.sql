-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : dim. 08 mai 2022 à 22:02
-- Version du serveur :  5.7.34
-- Version de PHP : 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sac_fidelity`
--

-- --------------------------------------------------------

--
-- Structure de la table `ADMINISTRATOR`
--

CREATE TABLE `ADMINISTRATOR` (
  `id` int(11) NOT NULL,
  `firstname` varchar(25) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `label_role` char(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ADMINISTRATOR`
--

INSERT INTO `ADMINISTRATOR` (`id`, `firstname`, `id_user`, `label_role`) VALUES
(1, 'admin', 30, 'sup'),
(3, 'test', 54, 'adm');

-- --------------------------------------------------------

--
-- Structure de la table `basket`
--

CREATE TABLE `basket` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `status` int(11) NOT NULL COMMENT '0: panier non valide / 1 : panier valide',
  `id_customer` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `basket`
--

INSERT INTO `basket` (`id`, `date`, `status`, `id_customer`) VALUES
(7, '2022-02-01', 1, 3),
(8, '2022-03-02', 1, 3),
(10, NULL, 1, 3),
(11, '2022-05-07', 1, 3),
(12, NULL, 0, 3),
(1234, '2022-05-08', 1, 9),
(1235, '2022-05-03', 1, 6);

-- --------------------------------------------------------

--
-- Structure de la table `contribution`
--

CREATE TABLE `contribution` (
  `id` int(11) NOT NULL,
  `payment_date` date DEFAULT NULL,
  `price` double DEFAULT NULL,
  `id_partner` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `contribution`
--

INSERT INTO `contribution` (`id`, `payment_date`, `price`, `id_partner`) VALUES
(13, '2020-05-05', 4000, 1),
(14, '2021-05-07', 2400, 1),
(16, '2022-05-07', 3200, 1),
(17, '2022-05-08', 2400, 3);

-- --------------------------------------------------------

--
-- Structure de la table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `firstname` varchar(25) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `zip_code` char(5) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `phone_number` char(10) DEFAULT NULL,
  `points` int(11) DEFAULT '0',
  `status` varchar(25) NOT NULL DEFAULT 'attente' COMMENT 'attente (mail non validé)\r\nvalide (mail validé)\r\nbanis',
  `loyalty_number` varchar(255) NOT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `customer`
--

INSERT INTO `customer` (`id`, `firstname`, `address`, `zip_code`, `city`, `phone_number`, `points`, `status`, `loyalty_number`, `id_user`) VALUES
(3, 'Coralie', '22 avenu rue test', '12354', 'Paris', 'null', 4061, 'attente', 'c84457499dda35c7', 18),
(6, 'ala', '88 boulevard saint mich', '91150', 'etampes', '0123456789', NULL, 'attente', '4ac464667bd4d8ca', 27),
(8, 'bb', 'bb', '12345', 'bb', '0123456789', NULL, 'attente', 'e56db3f10f44e676', 42),
(9, 'Ahmed', '66 rue du liÃ¨vre', '75016', 'Paris', '0606060606', NULL, 'attente', '4e9718de7e181a78', 43),
(10, 'Monsieur', 'Chez moi ici', '12345', 'Paris', '0123456789', 0, 'attente', 'fadd12b41df8cc05', 52),
(11, 'tttteessttt', 'eeeee', '12345', 'Paris', '0123456789', 0, 'attente', '91EBDF416C043F82', 56);

-- --------------------------------------------------------

--
-- Structure de la table `HISTORICAL`
--

CREATE TABLE `HISTORICAL` (
  `prix` int(11) DEFAULT NULL,
  `change_date` date DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `INCLUDE`
--

CREATE TABLE `INCLUDE` (
  `id` int(11) NOT NULL,
  `count` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `id_basket` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `INCLUDE`
--

INSERT INTO `INCLUDE` (`id`, `count`, `id_product`, `id_basket`) VALUES
(1, 2, 1, 7),
(2, 1, 4, 7),
(3, 1, 5, 8),
(4, 3, 11, 8),
(5, 1, 6, 8),
(6, 4, 4, 10),
(7, 1, 7, 10),
(20, 1, 10, 11),
(21, 1, 9, 11),
(22, 1, 4, NULL),
(23, 1, 4, NULL),
(24, 1, 4, NULL),
(25, 1, 4, NULL),
(26, 1, 4, NULL),
(27, 1, 11, 12),
(28, 1, 10, NULL),
(29, 1, 10, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `OBJECT`
--

CREATE TABLE `OBJECT` (
  `id` int(11) NOT NULL,
  `id_product` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `OBJECT`
--

INSERT INTO `OBJECT` (`id`, `id_product`) VALUES
(1, 1),
(4, 3),
(2, 6),
(6, 8),
(5, 9),
(3, 12);

-- --------------------------------------------------------

--
-- Structure de la table `partner`
--

CREATE TABLE `partner` (
  `id` int(11) NOT NULL,
  `siret` char(14) DEFAULT NULL,
  `start_partnership` date DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `partner`
--

INSERT INTO `partner` (`id`, `siret`, `start_partnership`, `status`, `logo`, `link`, `id_user`) VALUES
(1, '99999999999999', NULL, 1, 'macdo.png', 'https://www.mcdonalds.fr/', 26),
(3, '11111111111111', NULL, 1, 'chanel.jpeg', 'https://www.chanel.com/', 61);

-- --------------------------------------------------------

--
-- Structure de la table `PRESTATION`
--

CREATE TABLE `PRESTATION` (
  `id` int(11) NOT NULL,
  `reduction` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `id_partner` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `PRESTATION`
--

INSERT INTO `PRESTATION` (`id`, `reduction`, `id_product`, `id_partner`) VALUES
(4, 10, 7, 1),
(7, 20, 10, 1),
(8, 22, 11, 1),
(15, NULL, NULL, 3),
(16, NULL, 21, 3),
(17, NULL, 22, 1);

-- --------------------------------------------------------

--
-- Structure de la table `PRODUCT`
--

CREATE TABLE `PRODUCT` (
  `id` int(11) NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `PRODUCT`
--

INSERT INTO `PRODUCT` (`id`, `name`, `description`, `image`, `price`, `quantity`) VALUES
(1, 'produit1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit enim consequat urna hendrerit eleifend.', 'image.jpg', 100, 5),
(2, 'produit2', 'Aliquam erat volutpat. Aenean feugiat mollis nunc sed iaculis. Mauris ac enim ipsum. ', 'image.jpg', 50, 5),
(3, 'produit3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit enim consequat urna hendrerit eleifend.', 'image.jpg', 80, 5),
(4, 'produit4', 'Aliquam erat volutpat. Aenean feugiat mollis nunc sed iaculis. Mauris ac enim ipsum. ', 'image.jpg', 150, 5),
(5, 'produit5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit enim consequat urna hendrerit eleifend.', 'image.jpg', 100, 5),
(6, 'produit6', 'Aliquam erat volutpat. Aenean feugiat mollis nunc sed iaculis. Mauris ac enim ipsum. ', 'image.jpg', 500, 5),
(7, 'produit7', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit enim consequat urna hendrerit eleifend.', 'image.jpg', 100, 5),
(8, 'produit8', 'Aliquam erat volutpat. Aenean feugiat mollis nunc sed iaculis. Mauris ac enim ipsum. ', 'image.jpg', 50, 5),
(9, 'produit9', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit enim consequat urna hendrerit eleifend.', 'image.jpg', 10, 5),
(10, 'produit10', 'Aliquam erat volutpat. Aenean feugiat mollis nunc sed iaculis. Mauris ac enim ipsum. ', 'image.jpg', 75, 5),
(11, 'produit11', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit enim consequat urna hendrerit eleifend.', 'image.jpg', 350, 5),
(12, 'produit12', 'Aliquam erat volutpat. Aenean feugiat mollis nunc sed iaculis. Mauris ac enim ipsum. ', 'image.jpg', 200, 5),
(16, 'tetstststt', 'klkjhjkjk', 'image.jpg', 22, 234),
(17, 'presta1', 'Accès à une vente privée', 'image.jpg', 55, 10),
(18, 'presta1', 'Accès à une vente privée', 'image.jpg', 55, 10),
(19, 'Vente privée', 'Accès à une vente privée', 'image.jpg', 55, 10),
(20, 'Ala', 'Achetez Alaeddine Dhuilaa il fera votre PA', 'image.jpg', 1, 1),
(21, 'ala', 'Achetez Alaeddine Dhuilaa, il vous fera votre PA', 'image.jpg', 1, 1),
(22, 'test', 'tt', NULL, 9, 0);

-- --------------------------------------------------------

--
-- Structure de la table `PURCHASE`
--

CREATE TABLE `PURCHASE` (
  `id` int(11) NOT NULL,
  `number_credit_card` int(11) NOT NULL,
  `brand` varchar(25) NOT NULL,
  `country` varchar(5) NOT NULL,
  `exp_month` int(11) NOT NULL,
  `exp_year` int(11) NOT NULL,
  `client_ip` varchar(16) NOT NULL,
  `amount` double DEFAULT NULL,
  `date` datetime NOT NULL,
  `id_basket` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `PURCHASE`
--

INSERT INTO `PURCHASE` (`id`, `number_credit_card`, `brand`, `country`, `exp_month`, `exp_year`, `client_ip`, `amount`, `date`, `id_basket`, `id_product`) VALUES
(17, 4242, 'Visa', 'US', 11, 2023, '91.161.95.140', 700, '2022-04-21 16:40:02', 10, NULL),
(18, 2424, 'Visa', 'US', 12, 22, '1.1.1.1', 26, '2022-04-27 11:25:08', NULL, 7),
(19, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-04-12 18:05:40', NULL, 10),
(20, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-04-01 18:49:22', NULL, 7),
(21, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-03-01 18:49:22', NULL, 10),
(22, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-01-01 18:49:22', NULL, 7),
(23, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-02-01 18:49:22', NULL, 11),
(24, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-02-01 18:49:22', NULL, 7),
(25, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-07-01 18:49:22', NULL, 11),
(26, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-05-01 18:49:22', NULL, 11),
(27, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-06-01 18:49:22', NULL, 7),
(28, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-06-01 18:49:22', NULL, 7),
(29, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-08-01 18:49:22', NULL, 7),
(30, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-09-01 18:49:22', NULL, 11),
(31, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-08-01 18:49:22', NULL, 10),
(32, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-10-01 18:49:22', NULL, 10),
(33, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-11-01 18:49:22', NULL, 10),
(34, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2021-12-01 18:49:22', NULL, 7),
(35, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2022-01-01 18:49:22', NULL, 11),
(36, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2022-02-01 18:49:22', NULL, 7),
(37, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2022-02-01 18:49:22', NULL, 7),
(38, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2022-03-01 18:49:22', NULL, 10),
(39, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2022-03-01 18:49:22', NULL, 10),
(40, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2022-04-01 18:49:22', NULL, 10),
(41, 2424, 'Visa', 'US', 12, 20, '1.1.1.1', 29, '2022-04-01 18:49:22', NULL, 7),
(60, 4242, 'Visa', 'US', 9, 2023, '91.161.95.140', 75, '2022-05-06 18:20:34', NULL, 10),
(61, 4242, 'Visa', 'US', 9, 2023, '91.161.95.140', 75, '2022-05-06 18:21:32', NULL, 10),
(62, 4242, 'Visa', 'US', 9, 2023, '91.161.95.140', 700, '2022-05-06 18:32:17', 10, NULL),
(63, 4242, 'Visa', 'US', 9, 2023, '91.161.95.140', 350, '2022-05-06 18:50:31', NULL, 11),
(64, 4242, 'Visa', 'US', 9, 2023, '91.161.95.140', 350, '2022-05-07 08:07:45', NULL, 11),
(65, 4242, 'Visa', 'US', 9, 2024, '91.161.95.140', 350, '2022-05-07 08:51:00', NULL, 11),
(66, 4242, 'Visa', 'US', 9, 2023, '91.161.95.140', 350, '2022-05-07 08:52:49', NULL, 11),
(67, 4242, 'Visa', 'GB', 9, 2023, '91.161.95.140', 75, '2022-05-07 08:53:39', NULL, 10),
(68, 4242, 'Visa', 'US', 9, 2023, '91.161.95.140', 350, '2022-05-07 08:57:33', 11, NULL),
(69, 4242, 'Visa', 'US', 9, 2023, '91.161.95.140', 85, '2022-05-07 13:57:08', 11, NULL),
(70, 4242, 'Visa', 'US', 9, 2023, '91.161.95.140', 150, '2022-05-07 18:17:01', NULL, 4);

-- --------------------------------------------------------

--
-- Structure de la table `RATING`
--

CREATE TABLE `RATING` (
  `id` int(11) NOT NULL,
  `rating_number` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `RATING`
--

INSERT INTO `RATING` (`id`, `rating_number`, `title`, `comments`, `created`, `id_product`, `id_user`) VALUES
(1, 4, 'Test1', 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...', '2022-04-04 11:03:48', 1, 18),
(2, 2, 'Test2', 'Ceci est un test.', '2022-04-04 11:03:48', 1, 43),
(3, 3, 'Test encore', 'Ceci est encore une fois un test.', '2022-04-04 11:05:07', 2, 43),
(4, 3, 'ddd', 'dddddd', '2022-04-21 16:17:02', 11, 18),
(5, 4, 'Test', 'Ceci est un test.', '2022-05-06 17:56:31', 11, 18),
(6, 3, 'Encore?', '', '2022-05-06 17:56:41', 11, 18),
(7, 3, 'ETST', 'lkjk', '2022-05-07 10:09:21', 2, 18);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `label` char(3) NOT NULL,
  `description` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`label`, `description`) VALUES
('adm', 'admin'),
('sup', 'super admin');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES
(18, 'Boyer', 'bibul@gmail.com', '0159ef59f036bcdd2deece22d2e0fe2743bd1bec1ec74d9048131ddaf33bddfc7ed02b75c7d4de1cb28a0aa718961a21bffc5f32de7edf2f6d202be7cc2005c2'),
(26, 'macdo', 'zozo@gmail.com', '0159ef59f036bcdd2deece22d2e0fe2743bd1bec1ec74d9048131ddaf33bddfc7ed02b75c7d4de1cb28a0aa718961a21bffc5f32de7edf2f6d202be7cc2005c2'),
(27, 'anon', 'ala@gmail.com', '0159ef59f036bcdd2deece22d2e0fe2743bd1bec1ec74d9048131ddaf33bddfc7ed02b75c7d4de1cb28a0aa718961a21bffc5f32de7edf2f6d202be7cc2005c2'),
(30, 'adm', 'admin@admin.c', '29e7c6238e5f3fb427a3b83f4fa00152c7f1d7f099e9b953c63e85808d5d3ce01387ea9f0c4d105791fddc0b0bf38f5725c2b9080925230ee2d618b665287a25'),
(42, 'bb', 'mm@mm.fr', '0159ef59f036bcdd2deece22d2e0fe2743bd1bec1ec74d9048131ddaf33bddfc7ed02b75c7d4de1cb28a0aa718961a21bffc5f32de7edf2f6d202be7cc2005c2'),
(43, 'Doe', 'user@mail.fr', '0159ef59f036bcdd2deece22d2e0fe2743bd1bec1ec74d9048131ddaf33bddfc7ed02b75c7d4de1cb28a0aa718961a21bffc5f32de7edf2f6d202be7cc2005c2'),
(44, 'test', 'll@ll.com', '0159ef59f036bcdd2deece22d2e0fe2743bd1bec1ec74d9048131ddaf33bddfc7ed02b75c7d4de1cb28a0aa718961a21bffc5f32de7edf2f6d202be7cc2005c2'),
(49, 'test', 'll@ll.com', '0159ef59f036bcdd2deece22d2e0fe2743bd1bec1ec74d9048131ddaf33bddfc7ed02b75c7d4de1cb28a0aa718961a21bffc5f32de7edf2f6d202be7cc2005c2'),
(50, 'test', 'mm@zszsss.com', '0159ef59f036bcdd2deece22d2e0fe2743bd1bec1ec74d9048131ddaf33bddfc7ed02b75c7d4de1cb28a0aa718961a21bffc5f32de7edf2f6d202be7cc2005c2'),
(52, 'testToken', 'monsieur@gmail.com', '0159ef59f036bcdd2deece22d2e0fe2743bd1bec1ec74d9048131ddaf33bddfc7ed02b75c7d4de1cb28a0aa718961a21bffc5f32de7edf2f6d202be7cc2005c2'),
(53, 'Test', 'la@ici.com', 'e05af1399f4f4beb7934c9f12ba5a9c88f7ee1e8ef3fe7a167be4b979c515d24102ad90d3a0754d48fc5930f6369a3087e686e9732ef3460e6439a95089b4800'),
(54, 'test', 'test@fds.c', '745d02ffe3f66d0e8d77936c200e1474f2ee8e6f1b1ffdeaeda983ffb722d883c31be89d7188b63bb0e9718569af03fc0f067d28f12bf318a94dbc07cae404ba'),
(55, 'lkl', 'lklk@lklk', '0159ef59f036bcdd2deece22d2e0fe2743bd1bec1ec74d9048131ddaf33bddfc7ed02b75c7d4de1cb28a0aa718961a21bffc5f32de7edf2f6d202be7cc2005c2'),
(56, 'test', 'mm@kjkl.c', '0159ef59f036bcdd2deece22d2e0fe2743bd1bec1ec74d9048131ddaf33bddfc7ed02b75c7d4de1cb28a0aa718961a21bffc5f32de7edf2f6d202be7cc2005c2'),
(61, 'Channel', 'channel@channel.fr', '0159ef59f036bcdd2deece22d2e0fe2743bd1bec1ec74d9048131ddaf33bddfc7ed02b75c7d4de1cb28a0aa718961a21bffc5f32de7edf2f6d202be7cc2005c2');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ADMINISTRATOR`
--
ALTER TABLE `ADMINISTRATOR`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `label_role` (`label_role`);

--
-- Index pour la table `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_customer` (`id_customer`);

--
-- Index pour la table `contribution`
--
ALTER TABLE `contribution`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_partner` (`id_partner`);

--
-- Index pour la table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `HISTORICAL`
--
ALTER TABLE `HISTORICAL`
  ADD KEY `id_product` (`id_product`);

--
-- Index pour la table `INCLUDE`
--
ALTER TABLE `INCLUDE`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_basket` (`id_basket`);

--
-- Index pour la table `OBJECT`
--
ALTER TABLE `OBJECT`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`);

--
-- Index pour la table `partner`
--
ALTER TABLE `partner`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `PRESTATION`
--
ALTER TABLE `PRESTATION`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_partner` (`id_partner`);

--
-- Index pour la table `PRODUCT`
--
ALTER TABLE `PRODUCT`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `PURCHASE`
--
ALTER TABLE `PURCHASE`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_basket` (`id_basket`),
  ADD KEY `id_product` (`id_product`);

--
-- Index pour la table `RATING`
--
ALTER TABLE `RATING`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`label`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ADMINISTRATOR`
--
ALTER TABLE `ADMINISTRATOR`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `basket`
--
ALTER TABLE `basket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1236;

--
-- AUTO_INCREMENT pour la table `contribution`
--
ALTER TABLE `contribution`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `INCLUDE`
--
ALTER TABLE `INCLUDE`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `OBJECT`
--
ALTER TABLE `OBJECT`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `partner`
--
ALTER TABLE `partner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `PRESTATION`
--
ALTER TABLE `PRESTATION`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `PRODUCT`
--
ALTER TABLE `PRODUCT`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `PURCHASE`
--
ALTER TABLE `PURCHASE`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT pour la table `RATING`
--
ALTER TABLE `RATING`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ADMINISTRATOR`
--
ALTER TABLE `ADMINISTRATOR`
  ADD CONSTRAINT `administrator_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `administrator_ibfk_2` FOREIGN KEY (`label_role`) REFERENCES `role` (`label`),
  ADD CONSTRAINT `administrator_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `USER` (`id`);

--
-- Contraintes pour la table `basket`
--
ALTER TABLE `basket`
  ADD CONSTRAINT `basket_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`);

--
-- Contraintes pour la table `contribution`
--
ALTER TABLE `contribution`
  ADD CONSTRAINT `contribution_ibfk_1` FOREIGN KEY (`id_partner`) REFERENCES `partner` (`id`);

--
-- Contraintes pour la table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `HISTORICAL`
--
ALTER TABLE `HISTORICAL`
  ADD CONSTRAINT `historical_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `PRODUCT` (`id`);

--
-- Contraintes pour la table `INCLUDE`
--
ALTER TABLE `INCLUDE`
  ADD CONSTRAINT `include_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `PRODUCT` (`id`),
  ADD CONSTRAINT `include_ibfk_2` FOREIGN KEY (`id_basket`) REFERENCES `BASKET` (`id`);

--
-- Contraintes pour la table `OBJECT`
--
ALTER TABLE `OBJECT`
  ADD CONSTRAINT `object_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `PRODUCT` (`id`);

--
-- Contraintes pour la table `partner`
--
ALTER TABLE `partner`
  ADD CONSTRAINT `partner_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `partner_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `PRESTATION`
--
ALTER TABLE `PRESTATION`
  ADD CONSTRAINT `prestation_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `PRODUCT` (`id`),
  ADD CONSTRAINT `prestation_ibfk_2` FOREIGN KEY (`id_partner`) REFERENCES `PARTNER` (`id`);

--
-- Contraintes pour la table `PURCHASE`
--
ALTER TABLE `PURCHASE`
  ADD CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`id_basket`) REFERENCES `basket` (`id`),
  ADD CONSTRAINT `purchase_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `PRODUCT` (`id`);

--
-- Contraintes pour la table `RATING`
--
ALTER TABLE `RATING`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `PRODUCT` (`id`),
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `USER` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
