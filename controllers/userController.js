const db = require('../models')
const User = db.User
const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const Comment = db.Comment
const Restaurant = db.Restaurant

let userController = {
  getUser: (req, res) => {
    const kk = Number(req.params.id)
    return User.findByPk(req.params.id, {
      include: [{ model: Comment, include: [Restaurant] }]
    }).then(user => {
      const totalComments = user.Comments.length
      return res.render('profile', { logUser: user, kk: kk, totalComments })
    })
  },
  editUser: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      return res.render('edit-user')
    })
  },
  putUser: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return User.findByPk(req.params.id).then(user => {
          user
            .update({
              name: req.body.name,
              image: file ? img.data.link : user.image
            })
            .then(user => {
              req.flash('success_messages', 'user was successfully to update')
              res.redirect(`/users/${req.params.id}`)
            })
        })
      })
    } else
      return User.findByPk(req.params.id).then(user => {
        user
          .update({
            name: req.body.name,
            image: user.image
          })
          .then(user => {
            req.flash('success_messages', 'user was successfully to update')
            res.redirect(`/users/${req.params.id}`)
          })
      })
  }
}
module.exports = userController
