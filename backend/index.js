//importar as bibilotecas express, body-parser, cors e mysql
const express      = require('express');
const bodyparser   = require('body-parser');
const cors         = require('cors');
const mysql        = require('mysql2');

const app = express();

//chamar o método body-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));

//chamar o método cors
app.use(cors());

//criar conexão com a base de dados
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"vendasdb",
    port:"3306"
});

//make a test for database connection
db.connect(err=>{
    if(err){console.log(err)}
    console.log('database connected...');
})

//get all data of tabela produtos from databse vendasdb
app.get('/produtos', (req,res)=>{
    
    const qr = `select * from produtos`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err, 'errs')}
        if(result.length>0){
            res.send({
                message: "all produtos data!",
                data:result
            })
        }else{
            res.send({
                message:'No data found!'
            });
        }
    });
});
//get a single data
app.get('/produtos/:id', (req,res)=>{
    
    let gID = req.params.id;
    const qr = `select * from produtos where id = ${gID}`

    db.query(qr, (err,result)=>{
        if(err){console.log(err, 'errs')}

        if(result.length>0){
            res.send({
                message:'get a single data products!',
                data:result
            })

        }else{
            res.send({
                message: 'data not found!'
            })
        }
    })
})
//create data or insert data on database
app.post('/produtos', (req,res)=>{
    console.log(req.body, 'created data');

    let Descricao = req.body.descricao;
    let Quantidade = req.body.quantidade;
    let Preco = req.body.preco;
    let Cliente = req.body.cliente;
    let Mobile = req.body.mobile;
    let Valor = req.body.valor;
    
    const qr = `insert into produtos (descricao, quantidade, preco, cliente, mobile, valor)
    values ('${Descricao}','${Quantidade}','${Preco}','${Cliente}','${Mobile}','${Valor}')`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        
        console.log(result, 'result');

        res.send({
            message:'data inserted!'
        });
    });
})
//update data
app.put('/produtos/:id', (req,res)=>{

    console.log(req.body,'updatedata');

    let gID = req.params.id;
    let Descricao = req.body.descricao;
    let Quantidade = req.body.quantidade;
    let Preco = req.body.preco;
    let Cliente = req.body.cliente;
    let Mobile = req.body.mobile;
    let Valor = req.body.valor;

    const qr = `update produtos set descricao = '${Descricao}', quantidade = '${Quantidade}',
                preco = '${Preco}', cliente = '${Cliente}', mobile = '${Mobile}', valor = '${Valor}'
                where id = '${gID}'`;
    
    db.query(qr, (err,result)=>{
        if(err){console.log(err)}

        res.send({
            message: 'data updated!'
        });
    });

})
//dele data 
app.delete('/produtos/:id',(req,res)=>{

    let gID = req.params.id;

    const qr = `delete from produtos where id = '${gID}'`;
    
    db.query(qr, (err,result)=>{
        if(err){console.log(err)}
        
        res.send({
            message: 'data deleted!'
        })
    })

})
//to provider the port to run a server application
app.listen(8080, () =>{
    console.log("database connected on port 8080...");
});
