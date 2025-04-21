import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'


const returnData = promise => {
  return promise.then(response => response.data)
}

const getNumbers = () => {
 return returnData(axios.get(baseUrl))
}

const addNumber = (newName) => {
  return returnData(axios.post(baseUrl, newName))
}

const updateNumber = (id, newData) => {
  return returnData(axios.put(`${baseUrl}/${id}`, newData))
}

const deleteNumber = (id) => {
  return returnData(axios.delete(`${baseUrl}/${id}`))
}

export { getNumbers, addNumber, updateNumber, deleteNumber }
