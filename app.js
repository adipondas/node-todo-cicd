const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Todo list array
let todoList = [];

// Routes
app.get('/', (req, res) => {
    res.render('todo', { todoList });
});

app.post('/add', (req, res) => {
    const newItem = req.body.todoItem;
    todoList.push(newItem);
    res.redirect('/');
});

app.get('/delete/:index', (req, res) => {
    const index = req.params.index;
    todoList.splice(index, 1);
    res.redirect('/');
});

// Start server
app.listen(port, () => {
    console.log(`Todo app listening at http://localhost:${port}`);
});
