USE `icei_40276543_banco`;

DROP TABLE IF EXISTS `alunos`;
CREATE TABLE IF NOT EXISTS `alunos` (
  `nome` varchar(100) NOT NULL,
  `imagem` varchar(100) NOT NULL,
  `digital` int NOT NULL,
  `rm` int NOT NULL AUTO_INCREMENT,
  `entrada` enum('sim','nao','atrasado','') NOT NULL,
  PRIMARY KEY (`rm`)
);
INSERT INTO `alunos` (`nome`, `imagem`, `digital`, `rm`, `entrada`) VALUES
('Pedro', '1', 1, 23100, 'sim'),
('Raul', '1', 1, 23093, 'sim');

DROP TABLE IF EXISTS `teste`;
CREATE TABLE IF NOT EXISTS `teste` (
  `nome` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `funcao` enum('adm','funcionario') NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
);


INSERT INTO `teste` (`nome`, `senha`, `funcao`, `id`) VALUES
('pedro', '$2y$10$gCfISVTQEKtuZ52Mq.leyuXfRp1lKBFjEsz2j5X4uylzegdO7jVb6', 'funcionario', 7),
('Fabricio', '$2y$10$WtJq51YluwgkosCThJpz5eTLlkvFT9bUD0Cl90HlScvPaYoD8foWa', 'funcionario', 4),
('Brenda', '$2y$10$LtBpDpdU1h/dI.fIRbEEiuW77PhNPsdS4ID2xirrGgmKJ67ddj2UG', 'adm', 5),
('miguel', '$2y$10$wkIYd3A0gsAo1cwO6c0W5eYOlHaNfWNNh746INqTPkdGRqfUnjXb.', 'adm', 9);