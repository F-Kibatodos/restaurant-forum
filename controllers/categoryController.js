const db = require('../models')
const Category = db.Category
const adminService = require('../services/adminService')

let categoryController = {
  getCategories: (req, res) => {
    return adminService.getCategories(req, res, data => {
      return res.render('admin/categories', data)
    })
  },
  postCategory: (req, res) => {
    return adminService.postCategory(req, res, data => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      return res.redirect('/admin/categories')
    })
  },
  putCategory: (req, res) => {
    return adminService.putCategory(req, res, data => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      return res.redirect('/admin/categories')
    })
  },
  deleteCategory: (req, res) => {
    return adminService.deleteCategory(req, res, data => {
      return res.redirect('/admin/categories')
    })
  }
}
module.exports = categoryController
