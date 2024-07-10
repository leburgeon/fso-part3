
// imports express
const express = require("express");
// Assigns an express server to app variable
const app = express();
// For using the json parser middlewear provided by express
app.use(express.json())
// Imports morgan, request logging middlewear
const morgan = require("morgan")
// For using the morgan middlewear with a pre-defined format
app.use(morgan('tiny'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


// Post mapping for a new contact
app.post('/api/persons', (req, res) => {
    let newPerson = req.body
    // For checking there is a name field
    if (!newPerson.name){
        return res.status(400).json({
            error: "name missing"
        })
    }
    // For checking if there is a number 
    if (!newPerson.number){
        return res.status(400).json({
            error: "number missing"
        })
    }
    // For ensuring that the name is not already in the phonebook
    if (persons.some(person => person.name === newPerson.name)){
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    // For adding the verified new person to the persons
    newPerson = {"id": String(Math.floor(Math.random() * 10000)), ...req.body}
    persons = persons.concat(newPerson)
    res.json(newPerson)
})

// Get mapping for info
app.get('/info', (req, res) => {
    const peopleCount = persons.length;
    const requestTime = new Date();
    res.send(`<p>Phonebook has info for ${peopleCount} people</p><p>${requestTime}</p>`)
})

// Get mapping for api/persons
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// Get mapping for a single person
app.get('/api/persons/:id', (req, res) =>{
    const personId = req.params.id
    const foundPerson = persons.find(person => person.id === personId)
    if (foundPerson) {
        return res.json(foundPerson)
    }
    res.status(404).end()
})

// Delete mapping for a single person object based on id parameter
app.delete('/api/persons/:id', (req, res) => {
    const personId = req.params.id
    persons = persons.filter(person => person.id !== personId)
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server listenening on port ${PORT}`)
})
