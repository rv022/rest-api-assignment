const express = require('express');
const app = express();
const port = 3000;
import { v4 as uuidv4 } from 'uuid';

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

//In memory array to store users. 
const users = [];

//Adding users
app.post('/users',(req,res) => {
    const { name, email } = req.body;

    if(!name || !email){
        return res.status(400).json({message: "Name and Email Are Required."});

    }
    
    const newUser = {
        id: uuidv4(),
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

//Getting users
app.get('/users/:id', (req, res) => {
    const {id} = req.params;

    const user = users.find(u => u.id === id);

    if(!user){
        return res.status(404).json({message: "User Not Found."});
    }

    res.json(user);
});

//Updating users
app.put('/user/:id', (req,res) => {
    const {id} = req.params;
    const {name,email} = req.body;

    if(!name || !email){
        return res.status(400).json({message: "Name and Email Are Required."});
    }

    const user = users.find(u => u.id === id);

    if(!user){
        return res.status(404).json({message: 'User Not Found.'});
    }

    user.name = name;
    user.email = email;

    res.json(user);

});

//Removing users
app.delete('/users/:id', (req,res) => {
    const {id} = req.params;

    const index = users.findIndex(u => u.id === id);

    if(index === -1){
        return res.status(404).json({message: 'User Not Found.'});
    }

    users.splite(index,1);

    res.status(204).send();
    
    
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing