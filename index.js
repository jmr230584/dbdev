//dotenv biblioteca para gestão de variaveis de ambiente 
//.config() vai procurar o arquivo .env e carregar as configurações para memoria 
require(`dotenv`).config();

const db = require (`./db`)

//PROCESS é o processo que está rodando no node.js
//ENV  é de env.. , algo de ambiente
// PORT  é a configuração da porta no arquivo .env
const port = process.env.PORT;

const express = require (`express`);

const app = express ();

app.use(express.json()); //serve para fazer o POST/INSERT

app.get(`/`, (req, res) => {
    res.json({
        message: `Funcionando!!`
    })
})

app.get(`/clientes/:id`, async (req, res) => {
    const cliente = await db.selectCustomer(req.params.id);
    res.json(cliente);
})

app.get(`/clientes`, async (req, res) => {
    const clientes = await db.selectCustomers();
    res.json(clientes);
})

app.post(`/clientes`, async (req, res) => {
    await db.insertCustomer(req.body);
    res.sendStatus(201); //status HTTP que foi cadastratado
})

app.patch(`/clientes/:id`, async (req, res) => {
    await db.updateCustomer(req.params.id, req.body);
    res.sendStatus(200); //status HTTP para atualização
})

app.delete(`/clientes/:id`, async (req, res) => {
    await db.deleteCustomer(req.params.id);
    res.sendStatus(204); //status HTTP para exclusão
})

app.listen(port);

console.log (`Backend rodando `);
