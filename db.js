async function connect(){ 

    // Se eu já ter feito uma vez a conexão com o banco (ele já está configurado)
    // ele chama a conexão já configurada, isso garante uma instancia da conexão 
    if(global.connection) return global.connection.connect();


    // criamos uma variável, o Poll é uma classe da biblioteca `pg`
    const {Pool} = require (`pg`);

    //a variável pool está lendo minha variável com o caminho para o banco,
    //nesse momento tenho um pool mas não estou conectado ao banco ainda
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING        
    });

    // o pool.connection se conecta ao banco o await espera essa conexão 
    //acontecer pra descer na linha de baixo 
    const client = await pool.connect();
    console.log(`Criou o pool de conexão`);

    // vai retornar a hora do banco de dados
    const res = await client.query(`select now()`);
    console.log(res.rows[0]); //exibir só a hora, vem um array e pegamos o primeiro campo
    client.release(); //para liberar a conexão

    global.connectio = pool; // torno a conexão global na aplicação
    return pool.connect();

    //return client; // aplicações pequena não costuma ter muita concorrencia com bd
}

connect();

async function selectCustomers(){
    const client = await connect();
    const res = await client.query(`SELECT * FROM clientes`);
    return res.rows;
}

async function selectCustomer(id){
    const client = await connect();
    const res = await client.query(`SELECT * FROM clientes WHERE ID=$1`, [id]);
    return res.rows;
}

async function insertCustomer(customer){
    const client = await connect();
    const sql = "INSERT INTO clientes (nome, idade, uf) VALUES ($1,$2,$3)";
    const values = [customer.nome, customer.idade, customer.uf];
    await client.query(sql, values); // INSERT não tem retorno   
}

async function updateCustomer(id,customer){
    const client = await connect();
    const sql = "UPDATE clientes SET nome=$1, idade=$2, uf=$3 WHERE id=$4";
    const values = [customer.nome, customer.idade, customer.uf, id];
    await client.query(sql, values);   
}

async function deleteCustomer(id){
    const client = await connect();
    const sql = "DELETE FROM clientes WHERE id=$1";
    const values = [id];
    await client.query(sql, values);   
}


module.exports = {
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}