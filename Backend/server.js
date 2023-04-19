const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Spms@2002',
    database: 'empform',

});

app.post('/', async(req, res) => {
    const { Name, MailId, Mobile, Gender, DOB, Qualification, Experience, DOJ } = req.body;
    const val = [Name, MailId, Mobile, Gender, DOB, Qualification, Experience, DOJ]
    try {
        const k = await db.query('insert into employees (Name,MailId,Mobile,Gender,DOB,Qualification,Experience,DOJ) values(?)', [val])
        console.log(k.rows);
    } catch (err) {
        console.error(err);
    }
    res.json({ msg: "success" })
})

app.get('/', async(req, res) => {
    try {
        const data = await db.query('select id,Name,MailId,Mobile,Gender,DOB as DOB,Qualification,Experience,(2023-Year(DOJ)) as CExperience,(2023-Year(DOB)) as Age from employees', (err, results, fields) => {
            res.json(results);
        });
    } catch (err) {
        console.log.error(err.message);
    }
})

app.listen(3000, (req, res) => {
    console.log("Server running");
})