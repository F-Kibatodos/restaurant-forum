/* 由於 adminController 和 api/adminController 很多部分重複，所以用 service 來做共同處理資料
之後再看是哪個 controller要如何運用處理後的資料 */
const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const adminService = {
  getRestaurants: (
    req,
    res,
    callback /* 在 controller 定義 callback，callback在這行是定義不是執行(沒有小括弧)*/
  ) => {
    return Restaurant.findAll({ include: [Category] }).then(restaurants => {
      callback({ restaurants }) // 定義好之後執行
    })
  },
  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, { include: [Category] }).then(
      restaurant => {
        callback({ restaurant })
      }
    )
  },
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
  deleteRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant.destroy().then(restaurant => {
        callback({ status: 'success', message: '' })
      })
    })
  }
}
module.exports = adminService
