const db = require('../../models')
const Category = db.Category
const adminService = require('../../services/adminService')

let categoryController = {
  getCategories: (req, res) => {
    return adminService.getCategories(req, res, data => {
      if (req.params.id) return res.json(data.category)
      else return res.json(data)
    })
  },
  postCategory: (req, res) => {
    return adminService.postCategory(req, res, data => {
      return res.json(data)
    })
  },
  putCategory: (req, res) => {
    return adminService.putCategory(req, res, data => {
      return res.json(data)
    })
  }
}
module.exports = categoryController
