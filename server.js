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
  // TODO BLLOG UPDATE on FRONT
  // .put((req, res) => {
  //   getBlogById(req, res)
  // })
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
  // TODO BLLOG UPDATE on FRONT
  .put((req, res) => {
    updateModal(req, res)
  })
  .delete((req, res) => {
    deleteModal(req, res)
  })
  

// app.post(/\/([a-z]+)/, (req, res) => {
//   createProduct(req, res, link)
// })

// const server = http.createServer( (req, res) => {

//   if (req.url.match(/\/([a-z]+)/) || (req.url === '/')) {
//     const urlSplit = req.url.split('/')
//     const link = urlSplit[1]
//     const id = urlSplit[2]
//     console.log(`${req.method} REQUEST`);

//     if (req.method === 'GET') {
      
//       if (id) {
//         getProductById(req, res, id, link)
//       } else {
//         getProducts(req, res, link)
//       }
      
//     } else if (req.method === 'OPTIONS') {
//       console.log(req.headers);
//     } else if (req.method === 'POST') {

//     } else if (req.method === 'PUT') {

//       updateProduct(req, res, id, link)

//     } else if (req.method === 'DELETE') {


//     }
//   }
// });

const PORT = process.env.PORT || 4040

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

// module.exports = server;
