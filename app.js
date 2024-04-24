const express = require('express'),
    bodyParser = require('body-parser'),
    // In order to use PUT HTTP verb to edit item
    methodOverride = require('method-override'),
    // Mitigate XSS using sanitizer
    sanitizer = require('sanitizer'),
    app = express(),
    port = 8000

app.use(bodyParser.urlencoded({
    extended: false
}));
// https: //github.com/expressjs/method-override#custom-logic
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method
    }
}));

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
