import { useState, useEffect } from 'react'
import axios from 'axios'
import { getNumbers, addNumber, updateNumber, deleteNumber } from './communication.jsx'

const Filter = (props) => {
  return (
    <div>Filter the names:<input onChange={props.FilterCb} /></div>
  )
}

const PersonForm = (props) => {
  return(
      <form onSubmit={props.addName}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameAdd} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberAdd} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)
}

const Persons = (props) => {
  return(<div>{props.persons.filter(props.filter)
	  .map((name) => <div key={name.name}>{name.name} {name.number} <button onClick={() => props.cb(name.id)}>delete</button></div>)}</div>)
}

const SuccessForm = ({message}) => {
    if (message === '')
        return
    const successStyle = {
        color: 'green',
        fonstStyle: 'italic',
        fonstSize: 18
    }

    return (
        <div style={successStyle}>
        <br />
        {message}
        </div>
    )
}

const ErrorForm = ({message}) => {
    if (message === '')
        return
    const errorStyle = {
        color: 'red',
        fonstStyle: 'italic',
        fonstSize: 20 
    }

    return (
        <div style={errorStyle}>
        <br />
        {message}
        </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    getNumbers().then(response => setPersons(response))
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.filter((name) => name.name === newName).length > 0) {
      if (confirm(`${newName} already exists. Do you want to replace the number?`)) {
        const id = persons.find(person => person.name === newName).id
        var res = updateNumber(id, nameObject)
        res.then(response =>
            setPersons(persons.map(person => person.name === newName ? response : person)))
           .catch(error => {
               setErrorMessage(`Error in updating '${newName.name}'.`)
               setTimeout(() => {
                   setErrorMessage('')
               }, 5000)
               return
           })
        setSuccessMessage(`${newName} updated successfully.`)
        setTimeout(() => {
            setSuccessMessage('')
        }, 5000)
      }
    } else {
      var res = addNumber(nameObject)
      res.then(response => {
                   setPersons(persons.concat(response))
                   })
        .catch(error => {
            setErrorMessage(`Unable to add ${newName} into the phonebook.`)
            setTimeout(() => {
                setErrorMessage('')
            }, 5000)
            return
        })
      setSuccessMessage(`${newName} added to the phonebook.`)
      setTimeout(() => {
          setSuccessMessage('')
      }, 5000)
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteEntry = (id) => {
    if (confirm("Are you sure that you want to delete the entry")) {
      deleteNumber(id).catch(error => {
          setErrorMessage(`${newName} has already been deleted from the phonebool.`)
          setTimeout(() => { setErrorMessage('')}, 5000)
          return
      })
      setPersons(persons.filter(person => person.id !== id))
      setSuccessMessage(`${newName} successfully removed from the phonebook.`)
      setTimeout(() => { setSuccessMessage('')}, 5000)
    }
  }

  const handleNameAdd = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    setNewNumber(event.target.value)
  }

  const collectFilter = (event) => {
    setFilter(event.target.value)
  }

  const nameFilter = (props) => {
    return newFilter === props.name.substring(0, newFilter.length)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorForm message={errorMessage} />
      <SuccessForm message={successMessage} />
      <Filter FilterCb={collectFilter} />
      <h3>Add a new name</h3>
      <PersonForm addName={addName} newName={newName}
	  handleNameAdd={handleNameAdd} newNumber={newNumber}
	  handleNumberAdd={handleNumberAdd} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={nameFilter} cb={deleteEntry} />
    </div>
  )
}

export default App
