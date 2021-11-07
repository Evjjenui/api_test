let data = require('../data/data')
const { writeToFile } = require('../utils')

function findAll(key) {
  return new Promise( ( resolve, reject ) => {
    if (key) {
      resolve(data[key])
    } else {
      resolve(data)
    }
  })
}

function findByID(id, key) {
  
  return new Promise( ( resolve, reject ) => {
    const productsList = data[key]
    const productById = productsList.find(item => item.id == id)
    resolve(productById)
  })
}

function create(item, key) {

  return new Promise( ( resolve, reject ) => {
    const newProduct  = {id: Date.now().toString(), ...item}
    data[key].push(newProduct)
    writeToFile('./data/data.json', data)
    resolve(newProduct)
  })
}

function update(id, item, key) {

  return new Promise( ( resolve, reject ) => {
    const index = data[key].findIndex((e) => e.id === id)
    data[key][index] = {id, ...item}
    console.log(data);
    writeToFile('./data/data.json', data)
    resolve(data[key][index])
  })
}

function deleteItem(id, key) {

  return new Promise( ( resolve, reject ) => {
    data[key] = data[key].filter((e) => e.id !== id)
    writeToFile('./data/data.json', data)
    resolve()
  })
}

module.exports = {
  findAll,
  findByID,
  create,
  update,
  deleteItem
}
