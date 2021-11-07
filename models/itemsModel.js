let data = require('../data/data')
const { writeToFile } = require('../utils')

function findAll(url) {
  return new Promise( ( resolve, reject ) => {
    if (url) {
      resolve(data[url])
    } else {
      resolve(data)
    }
  })
}

function findByID(id, url) {
  
  return new Promise( ( resolve, reject ) => {
    const productsList = data[url]
    const productById = productsList.find(item => item.id == id)
    resolve(productById)
  })
}

function create(item, url) {

  return new Promise( ( resolve, reject ) => {
    const newProduct  = {id: Date.now().toString(), ...item}
    data[url].push(newProduct)
    writeToFile('./data/data.json', data)
    resolve(newProduct)
  })
}

function update(id, item, url) {

  return new Promise( ( resolve, reject ) => {
    const index = data[url].findIndex((e) => e.id === id)
    data[url][index] = {id, ...item}
    console.log(data);
    writeToFile('./data/data.json', data)
    resolve(data[url][index])
  })
}

function deleteItem(id, url) {

  return new Promise( ( resolve, reject ) => {
    data[url] = data[url].filter((e) => e.id !== id)
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
