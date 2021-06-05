import express from 'express';
import mysql from 'mysql';

const app = express();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Reklama'
})



let isNumber = (num) => {
    return num != "" && typeof +num === 'number' && !isNaN(+num);
}

let isString = (string) => {
    return typeof(string) === "string";
}

let sendEror = (column, type, res) => {
    res.status(400).send({
        error: `Argument ${column} isnt ${type}`
    });
    //res.end('произошла ошибка');
 }

const testArgumentsSyntax = (string, type) => {
    let arr;

    if (string.includes(',')) {
        arr = string.split(',');
        return arr.every(arr => type(arr));
    }

    return type(string);
} 

let possibleQueries = ['Zakazchik', 'Mesyac_Arendi', 'Reklamnaya_Konstrukciya', 'Tip_Reklami'];

 
app.get("/", (req, res) => {
    pool.getConnection((err, connection) => {

        if (err) {
            res.sendStatus(500);
            return;
        }

        let params = {
            withParams: Object.keys(req.query).length > 0
        }

        if (params.withParams) {
            let queries = req.query;
            console.log((queries));

            let queryKey = Object.keys(queries)[0];
            console.log(queryKey)
            if( possibleQueries.includes( queryKey )) {
                params.query = {};
                params.query[queryKey] = +queries[queryKey];
            } else {
               sendEror(queryKey, 'allowed query', res);
               return;
            }

            if(!isNumber(queries[queryKey])) {
                sendEror(queryKey, 'number', res);
                return;
            }

        }

        console.log('connected as id ' + connection.threadId);

        connection.query(
            `SELECT Zakaz.Id_Zakaza, Zakazchik.id_zakazchika, Zakazchik.Imya_Zakazchika, Mesyci.Kod_Mesyaca, Mesyci.Nazvanie_Mesyaca, Tip_Reklami.Id_Tipa, Tip_Reklami.Nazvanie_Tipa, Zakaz.Reklamnaya_Konstrukciya FROM Zakaz INNER JOIN Zakazchik ON Zakaz.Zakazchik = Zakazchik.id_zakazchika INNER JOIN Mesyci ON Zakaz.Mesyac_Arendi = Mesyci.Kod_Mesyaca INNER JOIN Tip_Reklami ON Zakaz.Tip_Reklami = Tip_Reklami.Id_Tipa; ${params.withParams ? `where ${Object.keys(params.query)[0]} = ${params.query[Object.keys(params.query)[0]]}` : ""}`
            , (err, rows) => {
            connection.release();
            console.log(err);
            if(err) res.status('400');
            res.set('Access-Control-Allow-Origin', '*')
            res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
            res.set('Access-Control-Allow-Headers', 'Content-Type')
            res.send(rows).status(200);
        })
    });
});

app.listen(3001, () => {
    console.log('Server is running at port 3001');
})