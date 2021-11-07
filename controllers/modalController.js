const { findAll, findByID, create, update, deleteItem } = require('../models/itemsModel');
const { getPostData } = require('../utils');

// Get product
async function getModals(req, res) {
  const url = req.url.split('/')[1]
  try {
    const data = await findAll(url)

    res.writeHead(200, {'Content-Type': 'application/json'} )
    res.end(JSON.stringify(data))
  } catch (error) {
    console.log(error);
  }
}

// Get product by ID
async function getModalById(req, res) {
  const url = req.url.split('/')[1]
  try {
    const product = await findByID(req.params.id, url)
    
    if (!product) {
      res.writeHead(404, {'Content-Type': 'application/json'} )
      res.end(JSON.stringify({message : `Modal Not Found ${req.params.id}`}))
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'} )
      res.end(JSON.stringify(product))
    }
  } catch (error) {
    console.log(error)
  }
}

// POST new product
async function createModal(req, res) {
  const url = req.url.split('/')[1]

  try {
    const data = await getPostData(req)
    console.log(url)
    const modal = {
      modalName,
      addInfo,
      price,
      date
    }

    const newModal = await create(modal, url)

    res.writeHead(201, {'Content-Type': 'application/json'} )
    res.end(JSON.stringify(newModal))
    
  } catch (error) {
    console.log(error);
  }
}

// Update product by ID
async function updateModal(req, res) {
  const url = req.url.split('/')[1]

  try {
    const modal = await findByID(req.params.id, url)
    
    if (!modal) {
      res.writeHead(404, {'Content-Type': 'application/json'} )
      res.end(JSON.stringify({message : `Modal Not Found ${req.params.id}`}))
    } else {
      const data = await getPostData(req)
  
      const { modalName, addInfo, price } = JSON.parse(data)

      const modalData = {
        modalName: modalName || modal.modalName,
        addInfo: addInfo || modal.addInfo,
        price: price || modal.price,
      }
      
      const updatedModal = await update(req.params.id, modalData, url)

      res.writeHead(200, {'Content-Type': 'application/json'} )
      res.end(JSON.stringify(updatedModal))
    }
  } catch (error) {
    console.log(error);
  }
}

// DELTE product by ID
async function deleteModal(req, res) {
  const url = req.url.split('/')[1]

  try {
    const product = await findByID(req.params.id, url)
    
    if (!product) {
      res.writeHead(404, {'Content-Type': 'application/json'} )
      res.end(JSON.stringify({message : `Modal Not Found ${req.params.id}`}))
    } else {
      await deleteItem(req.params.id, url)

      res.writeHead(204, {'Content-Type': 'application/json'} )
      res.end(JSON.stringify({message: `Modal ${req.params.id} DELETED`}))
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getModals,
  getModalById,
  createModal,
  updateModal,
  deleteModal
}

