const express = require('express')
const router = express.Router()
const adminController = require('../controllers/api/adminController.js')
const categoryController = require('../controllers/api/categoryController')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })
const userController = require('../controllers/api/userController')
const passport = require('../config/passport')
const authenticated = passport.authenticate('jwt', { session: false })
const commentController = require('../controllers/api/commentController')
const restController = require('../controllers/api/restController')

const authenticatedAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.isAdmin) {
      return next()
    }
    return res.json({ status: 'error', message: 'permission denied' })
  } else {
    return res.json({ status: 'error', message: 'permission denied' })
  }
}
router.get('/restaurants', authenticated, restController.getRestaurants)
router.get(
  '/admin/restaurants',
  authenticated,
  authenticatedAdmin,
  adminController.getRestaurants
)
router.get('/admin/restaurants/:id', adminController.getRestaurant)
router.delete('/admin/restaurants/:id', adminController.deleteRestaurant)
router.post(
  '/admin/restaurants',
  upload.single('image'),
  adminController.postRestaurant
)
router.put(
  '/admin/restaurants/:id',
  upload.single('image'),
  adminController.putRestaurant
)
router.get('/admin/categories', categoryController.getCategories)
router.get('/admin/categories/:id', categoryController.getCategories)
router.post('/admin/categories', categoryController.postCategory)
router.put('/admin/categories/:id', categoryController.putCategory)
router.delete('/admin/categories/:id', categoryController.deleteCategory)
router.get('/restaurants/feeds', authenticated, restController.getFeeds)
router.get('/restaurants/:id', authenticated, restController.getRestaurant)
// jwt
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)
router.post('/comments', authenticated, commentController.postComment)
router.delete(
  '/comments/:id',
  authenticated,
  authenticatedAdmin,
  commentController.deleteComment
)
// user
router.get('/users/top', authenticated, userController.getTopUser)
router.get('/users/:id', authenticated, userController.getUser)
router.put(
  '/users/:id',
  authenticated,
  upload.single('image'),
  userController.putUser
)
router.post(
  '/favorite/:restaurantId',
  authenticated,
  userController.addFavorite
)
router.delete(
  '/favorite/:restaurantId',
  authenticated,
  userController.removeFavorite
)
router.post('/like/:restaurantId', authenticated, userController.addLike)
router.delete('/like/:restaurantId', authenticated, userController.removeLike)
router.post('/following/:userId', authenticated, userController.addFollowing)
router.delete(
  '/following/:userId',
  authenticated,
  userController.removeFollowing
)
module.exports = router
