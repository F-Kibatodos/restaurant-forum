const db = require('../models')
const Category = db.Category
const categoryServie = require('../services/categoryService')

let categoryController = {
  getCategories: (req, res) => {
    return categoryServie.getCategories(req, res, data => {
      return res.render('admin/categories', data)
    })
  },
  postCategory: (req, res) => {
    return categoryServie.postCategory(req, res, data => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      return res.redirect('/admin/categories')
    })
  },
  putCategory: (req, res) => {
    return categoryServie.putCategory(req, res, data => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      return res.redirect('/admin/categories')
    })
  },
  deleteCategory: (req, res) => {
    return categoryServie.deleteCategory(req, res, data => {
      return res.redirect('/admin/categories')
    })
  }
}
module.exports = categoryController
