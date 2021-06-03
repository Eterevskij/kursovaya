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
            `SELECT Zakaz.Id_Zakaza AS Id_Zakaza, Zakaz.Reklamnaya_Konstrukciya AS Reklamnaya_Konstrukciya, Mesyci.Nazvanie_Mesyaca AS Nazvanie_Mesyaca, Tip_Reklami.Nazvanie_Tipa AS Nazvanie_Tipa, Zakazchik.Imya_Zakazchika AS Imya_Zakazchika, Zakazchik.id_zakazchika AS id_zakazchika, Mesyci.Kod_Mesyaca AS Kod_Mesyaca FROM Zakaz INNER JOIN Mesyci ON Zakaz.Mesyac_Arendi = Mesyci.Kod_Mesyaca INNER JOIN Tip_Reklami ON Zakaz.Tip_Reklami = Tip_Reklami.Id_Tipa INNER JOIN Zakazchik ON Zakaz.Zakazchik = Zakazchik.id_zakazchika ${params.withParams ? `where ${Object.keys(params.query)[0]} = ${params.query[Object.keys(params.query)[0]]}` : ""}`
            , (err, rows) => {
            connection.release();
            console.log(err);
            if(err) res.status('400');
            res.send(rows).status(200);
        })
    });
});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
})