const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User
const pageLimit = 10

let restService = {
  getRestaurants: (req, res, callback) => {
    let offset = 0
    let whereQuery = {}
    let categoryId = ''
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery['categoryId'] = categoryId
    }
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    Restaurant.findAndCountAll({
      include: Category,
      where: whereQuery,
      offset: offset,
      limit: pageLimit
    }).then(result => {
      // data for pagination
      let page = Number(req.query.page) || 1
      let pages = Math.ceil(result.count / pageLimit)
      let totalPage = Array.from({ length: pages }).map(
        (item, index) => index + 1
      ) // 造出總頁數為長度的陣列，並將裡面每個元素的 index + 1之後給 view 用，這裡的 item 都是 undefined
      let prev = page - 1 < 1 ? 1 : page - 1
      let next = page + 1 > pages ? pages : page + 1
      const data = result.rows.map(r => ({
        ...r.dataValues,
        description: r.dataValues.description.substring(0, 50),
        isFavorited: req.user.FavoritedRestaurants.map(d => d.id).includes(
          r.id
        ),
        isLiked: req.user.LikedRestaurants.map(d => d.id).includes(r.id)
      }))
      Category.findAll().then(categories => {
        // 取出 categoies
        return callback({
          restaurants: data,
          categories: categories,
          categoryId: categoryId,
          page: page,
          totalPage: totalPage,
          prev: prev,
          next: next
        })
      })
    })
  },
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: [
        Category,
        { model: User, as: 'FavoritedUsers' },
        { model: User, as: 'LikedUsers' },
        { model: Comment, include: [User] }
      ]
    }).then(restaurant => {
      const isFavorited = restaurant.FavoritedUsers.map(d => d.id).includes(
        req.user.id
      )
      const isLiked = restaurant.LikedUsers.map(d => d.id).includes(req.user.id)
      restaurant.viewCounts = restaurant.viewCounts + 1
      restaurant.save({ fields: ['viewCounts'] }).then(restaurant => {
        return res.render('restaurant', {
          restaurant: restaurant,
          isFavorited: isFavorited,
          isLiked: isLiked
        })
      })
    })
  },
  getFeeds: (req, res) => {
    return Restaurant.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [Category]
    }).then(restaurants => {
      Comment.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [User, Restaurant]
      }).then(comments => {
        return res.render('feeds', {
          restaurants: restaurants,
          comments: comments
        })
      })
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
module.exports = restService
