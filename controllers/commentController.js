const db = require('../models')
const Comment = db.Comment
const commentService = require('../services/commentService')

let commentController = {
  postComment: (req, res) => {
    return commentService.postComment(req, res, data => {
      req.flash('success_messages', data['message'])
      return res.redirect(`/restaurants/${req.body.restaurantId}`)
    })
  },
  deleteComment: (req, res) => {
    return Comment.findByPk(req.params.id).then(comment => {
      comment.destroy().then(comment => {
        return res.redirect(`/restaurants/${comment.RestaurantId}`)
      })
    })
  }
}
module.exports = commentController
