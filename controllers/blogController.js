const { findAll, findByID, create, update, deleteItem } = require('../models/itemsModel');
const { getPostData } = require('../utils');

// Get blogItem
async function getBlogs(req, res) {
  try {
    const data = await findAll('blogs')

    res.writeHead(200, {'Content-Type': 'application/json'} )
    res.end(JSON.stringify(data))
  } catch (error) {
    console.log(error);
  }
}

// Get blogItem by ID
async function getBlogById(req, res) {
  try {
    const blogItem = await findByID(req.params.id, 'blogs')
    
    if (!blogItem) {
      res.status(404).json({message : `Blog Not Found ${req.params.id}`})
    } else {
      res.status(200).json(blogItem)
    }
  } catch (error) {
    console.log(error)
  }
}

// POST new blogItem
async function createBlog(req, res) {

  try {
    const data = await getPostData(req)
    
    console.log('BLOGS post');
    const { title, details, author } = JSON.parse(data)
    
    const blogItem = {
      title,
      details,
      author,
    }

    const newBlog = await create(blogItem, 'blogs')

    res.status(201).json(newBlog)
    
  } catch (error) {
    console.log(error);
  }
}

// Update blogItem by ID
async function updateBlog(req, res) {

  try {
    const blog = await findByID(req.params.id, 'blogs')
    
    if (!blog) {
      res.status(404).json({message : `Blog Not Found ${req.params.id}`})
    } else {
      const data = await getPostData(req)
  
      const { title, details, author } = JSON.parse(data)

      const blogData = {
        title: title || blog.title,
        details: details || blog.details,
        author: author || blog.author,
      }
      
      const updatedBlog = await update(req.params.id, blogData, 'blogs')

      res.status(200).json(updatedBlog)
    }
  } catch (error) {
    console.log(error);
  }
}

// DELTE blogItem by ID
async function deleteBlog(req, res) {

  try {
    const blogItem = await findByID(req.params.id, 'blogs')
    
    if (!blogItem) {
      res.status(404).json({message : `Blog Not Found ${req.params.id}`})
    } else {
      await deleteItem(req.params.id, 'blogs')

      res.status(204).json({message: `Blog ${req.params.id} DELETED`})
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

