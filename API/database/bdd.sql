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
-- Structure de la table `basket`
--

CREATE TABLE `basket` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `status` int(11) NOT NULL COMMENT '0: panier non valide / 1 : panier valide',
  `id_customer` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

-- --------------------------------------------------------

--
-- Structure de la table `OBJECT`
--

CREATE TABLE `OBJECT` (
  `id` int(11) NOT NULL,
  `id_product` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `label` char(3) NOT NULL,
  `description` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
