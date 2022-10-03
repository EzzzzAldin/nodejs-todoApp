//      inite dotenv
//         Modouls
// This Lib To security Port & Server Of DataBase
require('dotenv').config();

// Init Database => To Call DataBase File when DB File Is Connection DB
const db = require('./db/db');

// Models
// Form Of Todo DB
const Todo = require('./models/Todo');

// FrameWork Of Node.js
const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

// It Is Temeplet Engin To Connect Front-End And Back-End
const hbs = require('hbs');

// It Is Framework Of MongoDB
const mongoose = require('mongoose');

// Create Server Of Port Application
const app = express();
// Init static Fils
app.use('/assets', express.static(path.join(__dirname, 'public')));

// Init Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Init Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

//  PORT init
const PORT = process.env.PORT || 3000;

// Get All Todos From Database To Show In Index(home) page
app.get('/', async(req, res) => {
    // Get Todos Data
    let todos = await Todo.find();
    
    // Send Todos Data To index View
    res.render('index', {
        pageTitle: 'Todos',
        route: req.path,
        todos,
        });
});

// Get Form (title & body) Of Create Page
app.get('/create', (req, res) => {
    res.render('create', {
        pageTitle: 'Create Todo'
    });
});

// Get And Show Spical Todo By ID
app.get('/show/:id', async (req, res) => {
    // Validede If ID is Valid OBject ID
    const id = req.params.id;

    isInvalidId(res, id);


    const todo = await Todo.findById(req.params.id);

    res.render('show', {
        pageTitle: 'Show',
        todo,
    });
});

// Send Data Of Todo To DataBase
app.post('/save', (req, res) => {
    // Get Todo Title and Body
    const { title, body } = req.body;

    // Save Todo in DB
    Todo.create({title, description: body}, (err, todo) => {
        if(err) {

            return res.redirect('/create');
        };

        // Redirct in Todo index
        res.redirect('/')
    });
});

// Get Form (title & body) Of Edit Page 
app.get('/edit/:id', async (req, res) => {
    // Validede If ID is Valid OBject ID
    const id = req.params.id;

    isInvalidId(res, id);

    const todo = await Todo.findById(req.params.id);

    res.render('edit', {
        pageTitle: 'edit',
        todo,
    });
});

// Send Edit Data Of Todo To DataBase
app.post('/update/:id', async (req, res) => {
    // Validede If ID is Valid OBject ID
    const id = req.params.id;

    isInvalidId(res, id);
    // Get Title And Body
    const { title, body } = req.body;

    // Update Todo By ID And Return New Todo
    await Todo.updateOne({_id: id}, {title, description: body}, {new: true});

    // Redirct Show Route
    res.redirect(`/show/${id}`);
});

// Update singl Todo status
app.post('/update/:id/completed-status', async (req, res) => {
    // Validede If ID is Valid OBject ID
    const id = req.params.id;

    isInvalidId(res, id);
    // Find Todo By ID
    const todo = await Todo.findById(id);

    // Update Todo Status
    await Todo.updateOne({_id: id}, {completed: ! todo.completed});
    

    // Redirct Show Route
    res.redirect(`/show/${id}`);
});

// Remove Spical Todo By Id
app.post('/remove/:id', async (req, res) => {
    // Validede If ID is Valid OBject ID
    const id = req.params.id;

    isInvalidId(res, id);
    // Delete Todo
    await Todo.deleteOne({_id: req.params.id});

    // redirct to index 
    res.redirect('/');
});
const isInvalidId = (res, id) => {
    if(! mongoose.isValidObjectId(id)) {
        res.render('404', {
            pageTitle: 'Not Found',
        });
    };

};

// To Run My App With Port
app.listen(PORT, () => {
    console.log(`Server Run on PORT ${PORT}`);
});
