CREATE DATABASE IF NOT EXISTS `banco`;
USE `banco`;


DROP TABLE IF EXISTS `alunos`;
CREATE TABLE IF NOT EXISTS `alunos` (
  `nome` varchar(100) NOT NULL,
  `imagem` varchar(100) NOT NULL,
  `rm` int NOT NULL AUTO_INCREMENT,
  `entrada` enum('sim','nao','atrasado','') NOT NULL,
  PRIMARY KEY (`rm`)
) AUTO_INCREMENT=23208;

INSERT INTO `alunos` (`nome`, `imagem`, `rm`, `entrada`) VALUES
('Pedro', '1', 23100, 'sim'),
('Raul', '1', 23093, 'sim'),
('Gabriel Lucas', '1', 23080, 'sim'),
('Esaú Elias', '1', 23046, 'sim'),
('Paulo', '', 23106, ''),
('André de Pontes', '', 23128, ''),
('Isaac Rogovski', '', 23002, ''),
('André Santista', '', 23142, ''),
('Fabricio Hipólito', '', 23201, ''),
('Thayna', '', 23207, ''),
('Gabriel Rocha', '', 23032, ''),
('Luisa Yshizuka', '', 23198, ''),
('Isaac 2', '', 23003, ''),
('Felipe Alves', '', 23160, '');


DROP TRIGGER IF EXISTS `after_aluno_insert`;
DELIMITER $$
CREATE TRIGGER `after_aluno_insert` AFTER INSERT ON `alunos` FOR EACH ROW INSERT INTO digitais (rm) VALUES (NEW.rm)
$$
DELIMITER ;

DROP TABLE IF EXISTS `digitais`;
CREATE TABLE IF NOT EXISTS `digitais` (
  `rm` int NOT NULL,
  `slot` int DEFAULT NULL,
  PRIMARY KEY (`rm`)
);


INSERT INTO `digitais` (`rm`, `slot`) VALUES
(23201, 2),
(23002, 1),
(23080, NULL),
(23046, NULL),
(23032, 5),
(23093, NULL),
(23100, NULL),
(23106, NULL),
(23128, NULL),
(23142, NULL),
(23207, NULL),
(23198, 3),
(23003, 4),
(23160, 6);

DROP TABLE IF EXISTS `funcionario`;
CREATE TABLE IF NOT EXISTS `funcionario` (
  `nome` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `funcao` enum('adm','funcionario') NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
)AUTO_INCREMENT=10;


INSERT INTO `funcionario` (`nome`, `senha`, `funcao`, `id`) VALUES
('Eduardo', '1234', 'funcionario', 1),
('fabricio_1', '1234', 'adm', 6),
('Faf', '1234', 'adm', 9),
('pedro', '1234', 'funcionario', 5),
('isaa', '1234', 'funcionario', 7),
('isabe', '1234', 'adm', 8);
COMMIT;