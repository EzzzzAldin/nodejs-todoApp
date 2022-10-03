//  First Method to Get Data

app.get('/', (req, res) => {
    let todoList = [];
    // Get Todos Data
    Todo.find()
        .then((todos) => {
            todoList = todos;
            console.log(todoList);
            // Send Todos Data To index View
            res.render('index', {
                pageTitle: 'Todos',
                route: req.path,
                todos: todoList
            });

        })
        .catch(() => {
            throw new Exception('Error In Data');
        });
    
});