const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

let categoryServie = {
  getCategories: (req, res, callback) => {
    return Category.findAll().then(categories => {
      if (req.params.id) {
        Category.findByPk(req.params.id).then(category => {
          callback({ categories, category })
        })
      } else {
        callback({ categories })
      }
    })
  },
  postCategory: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: "name didn't exist" })
    } else {
      return Category.create({
        name: req.body.name
      }).then(category => {
        callback({
          status: 'success',
          message: 'category was successfully created'
        })
      })
    }
  },
  putCategory: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: "name didn't exist" })
    } else {
      return Category.findByPk(req.params.id).then(category => {
        category.update(req.body).then(category => {
          callback({
            status: 'success',
            message: 'category was successfully updated'
          })
        })
      })
    }
  },
  deleteCategory: (req, res, callback) => {
    return Category.findByPk(req.params.id).then(category => {
      category.destroy().then(category => {
        callback({ status: 'success', message: '' })
      })
    })
  }
}

module.exports = categoryServie
