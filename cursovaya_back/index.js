import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Reklama'
})

const corsOptions = {
    credentials: true
  }

  app.use(cors(corsOptions));

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
 }

const TABLE_COLUMNS = {
    info_o_Reklamnoj_Konstrukcii: {
        columns: ['Id', 'Storona', 'Lokacia'],
        query: 'SELECT Info_o_Reklamnoj_Konstrukcii.Id, Storona.Storona, Locacia.Adres FROM Info_o_Reklamnoj_Konstrukcii INNER JOIN Storona ON Info_o_Reklamnoj_Konstrukcii.Storona = Storona.Id INNER JOIN Locacia ON Info_o_Reklamnoj_Konstrukcii.Lokacia = Locacia.Id'
    },
    zakaz:{
        columns:['id' ,'zakazchik', 'mesyac_Arendi', 'reklamnaya_Konstrukciya', 'tip_Reklami', 'table'],
        query: 'SELECT Zakaz.Id AS Id, Zakazchik.Id AS id_zakazchika, Zakazchik.Imya_Zakazchika, Mesyci.Id AS Id_Mesyaca, Mesyci.Nazvanie_Mesyaca, Tip_Reklami.Id AS Id_Tipa, Tip_Reklami.Nazvanie_Tipa, Reklamnaya_Konstrukciya FROM Zakaz INNER JOIN Zakazchik ON Zakaz.Zakazchik = Zakazchik.Id INNER JOIN Mesyci ON Zakaz.Mesyac_Arendi = Mesyci.Id INNER JOIN Tip_Reklami ON Zakaz.Tip_Reklami = Tip_Reklami.Id '
    }
}


const testArgumentsSyntax = (string, type) => {
    let arr;

    if (string.includes(',')) {
        arr = string.split(',');
        return arr.every(arr => type(arr));
    }

    return type(string);
} 

 
app.get("/", (req, res) => {
    pool.getConnection((err, connection) => {

        if (err) {
            res.sendStatus(500);
            return;
        }

        let params = {
            withParams: Object.keys(req.query).length > 1,
            table: '',
            query: {
                column: '',
                value: '',
                isString: false
            }
        }

        let queries = req.query;
        
        console.log(queries);

        let queryKey = Object.keys(queries);

        if(!queryKey) {
            res.status(400).send({
                error: `Table not found`
            });
            return;
        }

        params.table = queries.table;

        params.query.column = queryKey.filter(key =>{
            return key !== 'table';
        })[0];


        if (params.withParams) {


            params.query.value = queries[params.query.column];

            if(!TABLE_COLUMNS[queries.table]){
                sendEror(queries.table, 'table' ,res)
                return
            }

            if(isNaN(+params.query.value)) {
                params.query.isString = true
            }
        }

        console.log('connected as id ' + connection.threadId);


        console.log(params)
        connection.query(
            `${TABLE_COLUMNS[params.table].query} ${params.withParams ? ('WHERE ' + (params.query.column === 'Id' ? (params.table + '.') : '') + params.query.column + (params.query.isString ? ' LIKE ' : '=')  +  (!params.query.isString ? ( params.query.value) : "'%" + params.query.value + "%'") ) : ""} ORDER BY Id`
            , (err, rows) => {
            connection.release();
            console.log(err);
            if(err) res.status('400');
            res.set('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Credentials', true);
            res.set('Access-Control-Allow-Methods', 'GET')
            res.set('Access-Control-Allow-Headers', 'Content-Type')
            res.send(rows).status(200);
        })
    });
});

app.delete("/", (req, res) => {

    let posibleTables = ['Info_o_Reklamnoj_Konstrukcii', 'Locacia', 'Mesyci', 'Priznaki', 'Priznaki_Konstrukcii', 'Storona', 'Tip_Reklami', 'zakaz', 'Zakazchik'];

    pool.getConnection((err, connection) => {
        console.log(req.query)
        if (err) {
            res.sendStatus(500);
            return;
        }

        let params = {
            withParams: Object.keys(req.query).length > 0
        }

        let ID, tableName;

        if (params.withParams) {
            let queries = req.query;
            console.log((queries));

            ID = +queries?.Id;
            tableName = queries?.tableName;

            if(!isNumber(ID)) {
                sendEror('id', 'number', res);
                return;
            }   
            
            if(!isString(tableName)) {
                sendEror('tableName', 'string', res);
                return;
            }   

            if(!posibleTables.includes(tableName)) {
                sendEror(tableName, 'stable', res);
                return;
            }
        
            console.log(queries, tableName)
        } else {
            res.status(400).send({
                error: `Argument weren't sent`
            });
            return
        }

        console.log('connected as id ' + connection.threadId);

        connection.query(
            ('DELETE FROM `' + tableName + '` WHERE `'+ tableName +'`.`' + (tableName === 'Priznaki_Konstrukcii' ? 'id_konstrukcii' : 'Id')  + '` = ' + ID)
            , (err, rows) => {
            connection.release();
            console.log(err);
            if(err) res.status('400');
            res.set('Access-Control-Allow-Origin', '*')
            res.set('Access-Control-Allow-Methods', 'OPTIONS')
            res.set('Access-Control-Allow-Headers', 'Content-Type')
            res.send(rows).status(200);
        })
    });
});

app.listen(3001, () => {
    console.log('Server is running at port 3001');
})