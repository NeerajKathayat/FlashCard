const express = require("express")

const mysql = require("mysql2")

const app = express()

const cors = require('cors')

app.use(express.json());
app.use(cors())


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"neeraj@123",
    database:"FLashCardDB"
})

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});


app.get("/api/flashcards",(req,res)=>{
    const sql = "SELECT * FROM flashcards"
    db.query(sql, (err,data)=>{
        if(err) return res.json({success:false,message:"Error"});
        
        return res.json({success:true,data:data})
    })
})



app.post('/api/flashcards', (req, res) => {
    const { question, answer } = req.body;
    db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, results) => {
        if (err) res.json({success:false,message:"Error"});
        return res.json({success:true, id: results.insertId, question, answer });
    });
});


// Update flashcard endpoint
app.put('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
  
    const sql = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
    db.query(sql, [question, answer, id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Failed to update flashcard' });
      } else {
        res.json({ id, question, answer });
      }
    });
  });
  


app.delete('/api/flashcards/:id', (req, res) => {
    db.query('DELETE FROM flashcards WHERE id = ?', [req.params.id], (err) => {
        if (err) res.json({success:false,message:"Error"});
        return res.json({success:true,message:"deleted successfully"});
    });
});



app.listen(4000,()=>{
    console.log("app listening to 4000 port....")
})