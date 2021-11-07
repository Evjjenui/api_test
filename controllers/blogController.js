const { findAll, findByID, create, update, deleteItem } = require('../models/itemsModel');
const { getPostData } = require('../utils');

// Get product
async function getBlogs(req, res) {
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
async function getBlogById(req, res) {
  const url = req.url.split('/')[1]
  try {
    const product = await findByID(req.params.id, url)
    
    if (!product) {
      res.writeHead(404, {'Content-Type': 'application/json'} )
      res.end(JSON.stringify({message : `Blog Not Found ${req.params.id}`}))
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'} )
      res.end(JSON.stringify(product))
    }
  } catch (error) {
    console.log(error)
  }
}

// POST new product
async function createBlog(req, res) {
  const url = req.url.split('/')[1]

  try {
    const data = await getPostData(req)
    
    console.log('BLOGS post');
    const { title, details, author } = JSON.parse(data)
    
    const product = {
      title,
      details,
      author,
    }

    const newBlog = await create(product, url)

    res.writeHead(201, {'Content-Type': 'application/json'} )
    res.end(JSON.stringify(newBlog))
    
  } catch (error) {
    console.log(error);
  }
}

// Update product by ID
async function updateBlog(req, res) {
  const url = req.url.split('/')[1]

  try {
    const blog = await findByID(req.params.id, url)
    
    if (!blog) {
      res.writeHead(404, {'Content-Type': 'application/json'} )
      res.end(JSON.stringify({message : `Blog Not Found ${req.params.id}`}))
    } else {
      const data = await getPostData(req)
  
      const { title, details, author } = JSON.parse(data)

      const blogData = {
        title: title || blog.title,
        details: details || blog.details,
        author: author || blog.author,
      }
      
      const updatedBlog = await update(req.params.id, blogData, url)

      res.writeHead(200, {'Content-Type': 'application/json'} )
      res.end(JSON.stringify(updatedBlog))
    }
  } catch (error) {
    console.log(error);
  }
}

// DELTE product by ID
async function deleteBlog(req, res) {
  const url = req.url.split('/')[1]

  try {
    const product = await findByID(req.params.id, url)
    
    if (!product) {
      res.writeHead(404, {'Content-Type': 'application/json'} )
      res.end(JSON.stringify({message : `Blog Not Found ${req.params.id}`}))
    } else {
      await deleteItem(req.params.id, url)

      res.writeHead(204, {'Content-Type': 'application/json'} )
      res.end(JSON.stringify({message: `Blog ${req.params.id} DELETED`}))
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
}

