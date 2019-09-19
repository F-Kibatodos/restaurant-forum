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
const userService = require('../services/userService')

let userController = {
  getUser: (req, res) => {
    return userService.getUser(req, res, data => {
      res.render('profile', data)
    })
  },
  editUser: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      if (req.user.id !== Number(req.params.id)) {
        req.flash('error_messages', '您無權編輯他人檔案')
        return res.redirect(`/users/${req.params.id}`)
      }
      return res.render('edit-user')
    })
  },
  putUser: (req, res) => {
    return userService.putUser(req, res, data => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      return res.redirect(`/users/${req.params.id}`)
    })
  },
  addFavorite: (req, res) => {
    return userService.addFavorite(req, res, data => {
      return res.redirect('back')
    })
  },
  removeFavorite: (req, res) => {
    return userService.removeFavorite(req, res, data => {
      return res.redirect('back')
    })
  },
  addLike: (req, res) => {
    return userService.addLike(req, res, data => {
      return res.redirect('back')
    })
  },

  removeLike: (req, res) => {
    return userService.removeLike(req, res, data => {
      return res.redirect('back')
    })
  },
  getTopUser: (req, res) => {
    return userService.getTopUser(req, res, data => {
      return res.render('topUser', data)
    })
  },
  addFollowing: (req, res) => {
    userService.addFollowing(req, res, data => {
      return res.redirect('back')
    })
  },
  removeFollowing: (req, res) => {
    userService.removeFollowing(req, res, data => {
      return res.redirect('back')
    })
  }
}
module.exports = userController
