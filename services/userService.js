const db = require('../models')
const User = db.User
const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const Comment = db.Comment
const Restaurant = db.Restaurant
const Favorite = db.Favorite
const Like = db.Like
const Followship = db.Followship

let userServerce = {
  getUser: (req, res, callback) => {
    const currentId = Number(req.params.id)
    return User.findByPk(req.params.id, {
      include: [
        { model: Comment, include: [Restaurant] },
        { model: Restaurant, as: 'FavoritedRestaurants' },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    }).then(user => {
      const totalComments = user.Comments.length
      const totalFavorites = user.FavoritedRestaurants.length
      const totalFollowers = user.Followers.length
      const totalFollowings = user.Followings.length
      const isFollowing = req.user.Followings.map(d => d.id).includes(currentId)
      let a = []
      user.Comments.map(c => a.push(c.RestaurantId))
      // console.log(a)
      let commentedRestaurants = Array.from(new Set(a))
      // console.log(commentedRestaurants)
      callback({
        logUser: user,
        currentId: currentId,
        totalComments,
        totalFavorites,
        totalFollowers,
        totalFollowings,
        isFollowing,
        totalComments
      })
    })
  }
}

module.exports = userServerce
