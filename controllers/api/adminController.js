const db = require('../../models')
const Restaurant = db.Restaurant
const Category = db.Category
const adminService = require('../../services/adminService')

const adminController = {
  getRestaurants: (req, res) => {
    return adminService.getRestaurants(req, res, data => {
      return res.json(data)
    })
  },
  getRestaurant: (req, res) => {
    return adminService.getRestaurant(req, res, data => {
      return res.json(data)
    })
  },
  deleteRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant.destroy().then(restaurant => {
        res.json({ status: 'success', message: '' })
      })
    })
  }
}
module.exports = adminController
