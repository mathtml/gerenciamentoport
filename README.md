Português:

Inicialmente o projeto é simples, é apenas uma página para gerenciamento de funcionários e criação de relatórios via excel.

Eu utilizo MARIADB para armazenamento dos dados.


Os comandos são básicos

create database portfolio;
verifique se foi criado o banco
show databases;
crie o usuario e senha
CREATE USER 'portfolio'@'localhost' IDENTIFIED BY 'portfolio';
de as permissões
GRANT ALL PRIVILEGES ON portfolio.* TO 'portfolio'@'localhost';
FLUSH PRIVILEGES;

não coloquei gitignore no .env para facilitar o processo de quem for baixar, apenas criar o banco de dados e utilizar o projeto.

na sequencia, apenas utilizar npm run build e npm start no backend e npm start no frontend.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

English:

Initially, the project is simple; it's just a page for managing employees and generating reports via Excel.

I use MARIADB for data storage.

The commands are basic:

Create the database:
CREATE DATABASE portfolio;
Verify if the database was created:
SHOW DATABASES;
Create the user and password:
CREATE USER 'portfolio'@'localhost' IDENTIFIED BY 'portfolio';
Grant permissions:
GRANT ALL PRIVILEGES ON portfolio.* TO 'portfolio'@'localhost';
FLUSH PRIVILEGES;

I didn’t include a gitignore for the .env file to simplify the process for those who download the project; they just need to create the database and use the project.

Then, simply run npm run build and npm start for the backend, and npm start for the frontend.
