const express = require('express')
const app = express()
const cors require(cors)

app.use(express.json())
app.use(cors())

const morgan = require('morgan')

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

morgan.token('data', (req, res) => {
    return JSON.stringify(req.body)
})

let persons = [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456",
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
    },
    {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345",
    },
    {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
    }
]


const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})

app.get('/', (request, response) => {
    console.log("Hello")
    response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const date = new Date().toString()
    response.send(`<h1>Phonebook has info for ${persons.length} people</h1><br/><h2>${date}</h2>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).send(`error: 'No person found with id ${id}'`)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body

    if (!person.name || person.name.length === 0) {
        response.status(400).send('{error: \'Name field must have a value\'}')
        return
    } else if (!person.number || person.number.length === 0) {
        response.status(400).send('{ error: \'Number field must have valid value\' }')
        return
    } else if (persons.find(existing_person => existing_person.name === person.name)) {
        console.log("FIND", persons.find(existing_person => existing_person.name === person.name))
        response.status(404).send('{ error: \'name must be unique\' }')
        return
    }
    
    person.id = Math.floor(Math.random() * 100000)
    persons = persons.concat(person)

    response.json(person)
})

