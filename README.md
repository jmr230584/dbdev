# dbdev
CREATE TABLE clientes (
	id SERIAL CONSTRAINT pk_id_clliente PRIMARY KEY,
	nome varchar (150) NOT NULL,
	idade integer NOT NULL,
	uf varchar (2) NOT NULL
);

usuario: postegres 
senha: admin

npm install pg express dotenv
• Pg é de postgree, essa biblioteca faz a comunicação com o banco de dados, essa é a forma original de se comunicar, forma nativa, existe outras
• Biblioteca é o express 
• Biblioteca ajuda a fazer gestão das variáveis de ambiente (dotenv) 

