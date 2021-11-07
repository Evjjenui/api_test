const { findAll, findByID, create, update, deleteItem } = require('../models/itemsModel');
const { getPostData } = require('../utils');

// Get modalItem
async function getModals(req, res) {
  
  try {
    const data = await findAll('modal_items')

    res.status(200).json(data)
  } catch (error) {
    console.log(error);
  }
}

// Get modalItem by ID
async function getModalById(req, res) {
  
  try {
    const modalItem = await findByID(req.params.id, 'modal_items')
    
    if (!modalItem) {
      res.status(404).json({message : `Modal Not Found ${req.params.id}`})
    } else {
      res.status(200).json(modalItem)
    }
  } catch (error) {
    console.log(error)
  }
}

// POST new modalItem
async function createModal(req, res) {
  

  try {
    const data = await getPostData(req)
    console.log('modal_items')
    const modal = {
      modalName,
      addInfo,
      price,
      date
    }

    const newModal = await create(modal, 'modal_items')

    res.status(201).json(newModal)
    
  } catch (error) {
    console.log(error);
  }
}

// Update modalItem by ID
async function updateModal(req, res) {
  

  try {
    const modal = await findByID(req.params.id, 'modal_items')
    
    if (!modal) {
      res.status(404).json({message : `Modal Not Found ${req.params.id}`})
    } else {
      const data = await getPostData(req)
  
      const { modalName, addInfo, price } = JSON.parse(data)

      const modalData = {
        modalName: modalName || modal.modalName,
        addInfo: addInfo || modal.addInfo,
        price: price || modal.price,
      }
      
      const updatedModal = await update(req.params.id, modalData, 'modal_items')

      res.status(200).json(updatedModal)
    }
  } catch (error) {
    console.log(error);
  }
}

// DELTE modalItem by ID
async function deleteModal(req, res) {
  

  try {
    const modalItem = await findByID(req.params.id, 'modal_items')
    
    if (!modalItem) {
      res.status(404).json({message : `Modal Not Found ${req.params.id}`})
    } else {
      
      await deleteItem(req.params.id, 'modal_items')

      res.status(204).json({message: `Modal ${req.params.id} DELETED`})
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

