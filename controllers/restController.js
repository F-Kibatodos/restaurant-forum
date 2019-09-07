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
    return Restaurant.findByPk(req.params.id, {
      include: [{ model: Comment }, { model: Category }]
    }).then(restaurant => {
      const totalComments = restaurant.Comments.length
      return res.render('dashboard', {
        restaurant,
        totalComments
      })
    })
  },
  getTopRestaurant: (req, res) => {
    // 撈出所有 Restaurant 與 favoritedUser 資料
    return Restaurant.findAll({
      include: [{ model: User, as: 'FavoritedUsers' }]
    }).then(restaurants => {
      // 整理 restaurants 資料
      restaurants = restaurants.map(restaurant => ({
        ...restaurant.dataValues,
        // 計算加入最愛人數
        FavoritedCount: restaurant.FavoritedUsers.length,
        // 判斷目前登入使用者是否已追蹤該 User 物件
        isFavorited: req.user.FavoritedRestaurants.map(r => r.id).includes(
          restaurant.id
        )
      }))
      // 依追蹤者人數排序清單
      restaurants = restaurants.sort(
        (a, b) => b.FavoritedCount - a.FavoritedCount
      )
      restaurants = restaurants.slice(0, 10)
      return res.render('topRestaurant', { restaurants: restaurants })
    })
  }
}
module.exports = restController
