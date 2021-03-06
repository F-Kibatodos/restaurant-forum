const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const fs = require('fs')
const Category = db.Category
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const bcrypt = require('bcrypt-nodejs')
const adminService = require('../services/adminService')

const adminController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res) => {
    // confirm password
    if (req.body.passwordCheck !== req.body.password) {
      req.flash('error_messages', '兩次密碼輸入不同！')
      return res.redirect('/signup')
    } else {
      // confirm unique user
      User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user) {
          req.flash('error_messages', '信箱重複！')
          return res.redirect('/signup')
        } else {
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(
              req.body.password,
              bcrypt.genSaltSync(10),
              null
            )
          }).then(user => {
            req.flash('success_messages', '成功註冊帳號！')
            return res.redirect('/signin')
          })
        }
      })
    }
  },
  signInPage: (req, res) => {
    return res.render('signin')
  },

  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/restaurants')
  },

  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },
  getRestaurants: (req, res) => {
    return adminService.getRestaurants(req, res, data => {
      return res.render('admin/restaurants', data)
    }) // data 對應到 service 的 callback 的參數，定義後就執行，引數是{ restaurants }
  },
  createRestaurant: (req, res) => {
    Category.findAll().then(categories => {
      return res.render('admin/create', { categories })
    })
  },
  postRestaurant: (req, res) => {
    return adminService.postRestaurant(req, res, data => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      return res.redirect('/admin/restaurants')
    })
  },
  getRestaurant: (req, res) => {
    return adminService.getRestaurant(req, res, data => {
      return res.render('admin/restaurant', data)
    })
  },
  editRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      Category.findAll().then(categories => {
        return res.render('admin/create', {
          categories: categories,
          restaurant: restaurant
        })
      })
    })
  },
  putRestaurant: (req, res) => {
    return adminService.putRestaurant(req, res, data => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      return res.redirect('/admin/restaurants')
    })
  },
  deleteRestaurant: (req, res) => {
    return adminService.deleteRestaurant(req, res, data => {
      if (data['status'] === 'success') {
        return res.redirect('/admin/restaurants')
      }
    })
  },
  getUsers: (req, res) => {
    return User.findAll().then(users => {
      return res.render('admin/users', { users: users })
    })
  },
  putUser: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      user
        .update({
          isAdmin: user.isAdmin ? false : true
        })
        .then(user => {
          req.flash('success_messages', 'user was successfully to update')
          res.redirect('/admin/users')
        })
    })
  }
}

module.exports = adminController
