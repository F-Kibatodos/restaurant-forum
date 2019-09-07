const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User
const pageLimit = 10
const restService = require('../services/restService')

let restController = {
  getRestaurants: (req, res) => {
    return restService.getRestaurants(req, res, data => {
      return res.render('restaurants', data)
    })
  },
  getRestaurant: (req, res) => {
    return restService.getRestaurant(req, res, data => {
      return res.render('restaurant', data)
    })
  },
  getFeeds: (req, res) => {
    return restService.getFeeds(req, res, data => {
      return res.render('feeds', data)
    })
  },
  getRestaurantDashboard: (req, res) => {
    return restService.getRestaurantDashboard(req, res, data => {
      return res.render('dashboard', data)
    })
  },
  getTopRestaurant: (req, res) => {
    return restService.getTopRestaurant(req, res, data => {
      return res.render('topRestaurant', data)
    })
  }
}
module.exports = restController
