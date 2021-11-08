const express = require('express')
const cors = require('cors')
const app = express()

const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('./controllers/blogController')
const { getModals, getModalById, createModal, updateModal, deleteModal } = require('./controllers/modalController')

app.use(cors())

// BLOGS
app.route('/blogs')
  .get((req, res) => {
    getBlogs(req, res)
  })
  .post((req, res) => {
    createBlog(req, res)
  })

app.route('/blogs/:id')
  .get((req, res) => {
    getBlogById(req, res)
  })
  // TODO BLOG UPDATE on FRONT
  .put((req, res) => {
    getBlogById(req, res)
  })
  .delete((req, res) => {
    deleteBlog(req, res)
  })
  

// MODAL ITEMS

app.route('/modal_items')
  .get((req, res) => {
    getModals(req, res)
  })
  .post((req, res) => {
    createModal(req, res)
  })

app.route('/modal_items/:id')
  .get((req, res) => {
    getModalById(req, res)
  })
  .put((req, res) => {
    updateModal(req, res)
  })
  .delete((req, res) => {
    deleteModal(req, res)
  })


const PORT = process.env.PORT || 4040

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
