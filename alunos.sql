DROP TABLE IF EXISTS `alunos`;
CREATE TABLE `alunos` (
  `nome` varchar(100) NOT NULL,
  `imagem` varchar(100) NOT NULL,
  `rm` int(11) NOT NULL,
  `entrada` enum('sim','nao','atrasado','') NOT NULL
);



INSERT INTO `alunos` (`nome`, `imagem`, `rm`, `entrada`) VALUES
('Isaac', 'Imagens/icon.png', 23002, 'sim'),
('Eduardo', 'Imagens/icon.png', 23043, 'sim'),
('Brenda', 'Imagens/icon.png', 23065, 'sim'),
('Pedro', 'Imagens/icon.png', 23100, 'sim'),
('Andre', 'Imagens/icon.png', 23128, 'sim'),
('Fabricio	', 'Imagens/icon.png', 23201, 'sim');

ALTER TABLE `alunos`
  ADD PRIMARY KEY (`rm`);

ALTER TABLE `alunos`
  MODIFY `rm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23202;
COMMIT;