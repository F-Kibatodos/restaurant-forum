const restService = require('../../services/restService')

let restController = {
  getRestaurants: (req, res) => {
    return restService.getRestaurants(req, res, data => {
      return res.json(data)
    })
  },
  getRestaurant: (req, res) => {
    return restService.getRestaurant(req, res, data => {
      return res.json(data)
    })
  }
}

module.exports = restController
