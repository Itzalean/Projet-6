-- phpMyAdmin SQL Dump
-- version 4.9.6
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : sam. 21 nov. 2020 à 18:54
-- Version du serveur :  10.4.13-MariaDB-log
-- Version de PHP : 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `Posts`
--

CREATE TABLE `Posts` (
  `id` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `Karma` int(11) NOT NULL,
  `Type` int(11) NOT NULL,
  `Deleted` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `userId` int(11) NOT NULL,
  `postId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Posts`
--

INSERT INTO `Posts` (`id`, `Title`, `Content`, `Karma`, `Type`, `Deleted`, `createdAt`, `updatedAt`, `userId`, `postId`) VALUES
(1, 'Premier post :)', 'First ^^', 0, 0, 0, '2020-11-12 08:46:07', '2020-11-12 08:46:07', 2, NULL),
(3, 'phpMyAdmin', 'http://localhost/phpmyadmin/index.php', 2, 2, 0, '2020-11-12 08:56:03', '2020-11-21 18:17:37', 2, NULL),
(9, 'Test commentaire', 'Ditto', 1, 0, 0, '2020-11-12 09:11:45', '2020-11-13 07:20:16', 2, 3),
(10, 'Commentaire 2', 'Pour voir....', -1, 0, 0, '2020-11-12 11:47:36', '2020-11-13 07:21:14', 2, 3),
(11, 'Tentative', 'Essai', 0, 0, 0, '2020-11-13 05:55:03', '2020-11-13 07:41:18', 2, 3),
(12, 'coucou', 'uocuoc', 0, 0, 0, '2020-11-13 06:05:46', '2020-11-13 07:09:01', 2, 3),
(13, 'test test test  gg', 'encore un test', -2, 0, 0, '2020-11-13 15:07:59', '2020-11-18 15:00:45', 2, NULL),
(14, '[Openbox] This APT has super cow powers', 'http://localhost:8080/images/9v7m7vkxbzs51-1605980559692.jpg ', 3, 1, 0, '2020-11-13 15:59:18', '2020-11-21 18:42:39', 1, NULL),
(42, 'Startpage', 'https://www.startpage.com/', 1, 2, 0, '2020-11-15 12:13:29', '2020-11-19 16:53:53', 2, NULL),
(52, 'Déclenchement bug ^^', 'mwahahaha >:D\n\nEdit: Corrigé \\o/', 1, 0, 0, '2020-11-15 15:54:38', '2020-11-15 17:24:47', 2, 42),
(125, 'Conversation', '- Bonjour, comment ça va ?\n- Bien et toi ?\n-Très bien, merci\n\n\"Au revoir\"\n', 0, 0, 0, '2020-11-17 12:29:01', '2020-11-18 15:26:36', 2, NULL),
(126, 'a', 'sqsdfq\n\nrfgdfg\n', 0, 0, 0, '2020-11-17 12:30:31', '2020-11-17 12:30:31', 2, 125),
(127, 'Shadow Dancer sur fs-uae (Émulateur Amiga)', 'http://localhost:8080/images/shadowdancer-real-2007020124-01-1605980529412.png ', 0, 1, 0, '2020-11-17 12:32:10', '2020-11-21 18:42:09', 2, NULL),
(128, 'Cards dans Bootstrap-Vue', 'https://bootstrap-vue.org/docs/components/card', 0, 2, 0, '2020-11-17 12:32:45', '2020-11-18 14:39:30', 2, NULL),
(130, '[OC] Dynamic wallpaper changer (time and weather) [WIP]', 'https://github.com/wtheisen/BashDynamicPaper', 2, 2, 0, '2020-11-18 23:38:46', '2020-11-18 23:38:46', 1, NULL),
(131, 'Details', 'Details: I was always bothered when one of my sunny wallpapers came up after dark so I decided to make a time sensitive wallpaper changer. Added weather to it as well because why not. Works on most linux systems and macOS.', 0, 0, 0, '2020-11-18 23:39:34', '2020-11-18 23:39:34', 1, 130),
(132, 'Nice', 'well done man!', 1, 0, 0, '2020-11-18 23:40:17', '2020-11-18 23:40:17', 2, 130),
(133, '[Plasma] Unity, now Rule 3 compliant :)', 'http://localhost:8080/images/gm2fakr3raz51-1605980510739.png ', 3, 1, 0, '2020-11-18 23:44:11', '2020-11-21 18:41:50', 2, NULL),
(134, 'Details', 'So, my last post was taken down because I didn\'t respect rule 3...\n\nNow I\'m back with a new setup (and new distro), after learning how to edit some CSS :)\n\nDetails:\n\nDistro: Arch Linux\n\nDE: KDE Plasma 5.20.3\n\nWM Theme: Sierra Breeze Enhanced (with special rules for discord and konsole blur)\n\nTerminal: Konsole (to achieve this, use the Materia Dark Color scheme with transparency set to 25%, while overriding the window decoration opacity to 50%)\n\nPlasma Theme: Breeze with Materia KDE color scheme, MateriaDark kvantum theme\n\nIcons: la-capitaine-icon-theme\n\nCustom discord theme: discord_materia_blur\n\nMusic Visualizer: glava (that bars widget at the bottom left toggles it - it\'s called Configurable Button and runs this script -- DISABLE glava\'s fps output or it WILL crash)\n', 0, 0, 0, '2020-11-18 23:44:53', '2020-11-18 23:44:53', 2, 133),
(135, 'Question', 'What widgets did you use on the to panel, im trying to make arch look like mac without apple branding', 0, 0, 0, '2020-11-18 23:46:20', '2020-11-18 23:53:39', 1, 133),
(136, 'I don\'t know if I did it, but this is based on Ubuntu 8.04', 'I was 13 years old the first time I used Linux, now I\'m 24 years old. I started with Ubuntu 8.04 because my computer in that time didn\'t support 10.04. The purpose of this theme is to remember the old Ubuntu.\n\n\nDetails:\n\nOS: Ubuntu 20.04 LTS\n\nWM: Openbox\n\nPanel: Polybar\n\nCompositor: Ibhagwan\'s Picom Fork\n\nTerminal: ST\n\nOpenbox Theme: Human-like theme\n', 1, 0, 0, '2020-11-19 00:19:33', '2020-11-19 00:19:33', 1, 14),
(137, '@op', 'Bro, we have the same unix-story! except this im 25.\n\nbtw I use arch now <3', 0, 0, 0, '2020-11-19 00:20:48', '2020-11-19 00:20:48', 2, 14),
(142, 'Deuxième post', 'Second !\nEt bam !! Une semaine après, post qui n\'a pas été beaucoup vu :D', 0, 0, 0, '2020-11-19 16:58:55', '2020-11-19 16:58:55', 9, 1),
(145, 'lien', 'http://www.google.fr', 0, 2, 0, '2020-11-21 18:15:17', '2020-11-21 18:15:17', 10, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Karma` tinyint(1) NOT NULL,
  `Rank` varchar(5) NOT NULL DEFAULT 'USER',
  `Attempts` tinyint(4) NOT NULL DEFAULT 0,
  `Deleted` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `Name`, `Email`, `Password`, `Karma`, `Rank`, `Attempts`, `Deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Argian', 'moi@test.fr', '$2b$12$R15B7y4OPPjtWR85WH3bwe4pX5FNMg2pjBSie0XyUPGS1.051.kLa', 0, 'ADMIN', 0, 0, '2020-11-12 08:44:33', '2020-11-12 08:44:33'),
(2, 'a', 'a@a.aa', '$2b$12$UyWkLbCEnZ9EtzWjJKRrPuujnIT3PX/n8/OsKCXqsO1ZSDx/sG2Rq', 0, 'USER', 0, 0, '2020-11-12 08:45:28', '2020-11-12 08:45:28'),
(9, 'Nabuchodonosor Ier', 'n@n.nn', '$2b$12$pLQVUR4ZjFGAN7MwbSqd/OssyXN1j45d9lOfLopQtq6SEOWnf.ABu', 0, 'MOD', 0, 0, '2020-11-19 14:53:16', '2020-11-19 14:53:16'),
(10, 'user', 'moi@moi.fr', '$2b$12$J9fMsAZUr7eRvxvQWZXbhuLPCCJNydEx4nKEQIGSVrnVf6U3VUg1m', 0, 'USER', 0, 0, '2020-11-21 18:11:57', '2020-11-21 18:11:57');

-- --------------------------------------------------------

--
-- Structure de la table `Votes`
--

CREATE TABLE `Votes` (
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `Vote` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Votes`
--

INSERT INTO `Votes` (`userId`, `postId`, `Vote`) VALUES
(1, 1, 1),
(1, 3, 1),
(1, 13, -1),
(1, 14, 1),
(1, 42, 1),
(1, 130, 1),
(1, 133, 1),
(2, 1, -1),
(2, 3, 1),
(2, 9, 1),
(2, 10, -1),
(2, 14, 1),
(2, 42, -1),
(2, 52, 1),
(2, 127, 1),
(2, 128, 0),
(2, 130, 1),
(2, 132, 1),
(2, 133, 1),
(2, 136, 1),
(9, 13, -1),
(9, 14, 1),
(9, 42, 1),
(9, 127, -1),
(9, 133, 1),
(10, 133, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `postId` (`postId`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Index pour la table `Votes`
--
ALTER TABLE `Votes`
  ADD UNIQUE KEY `voteId` (`userId`,`postId`) USING BTREE,
  ADD KEY `postId` (`postId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD CONSTRAINT `Posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Posts_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Votes`
--
ALTER TABLE `Votes`
  ADD CONSTRAINT `Votes_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
