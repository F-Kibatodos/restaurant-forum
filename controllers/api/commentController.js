const db = require('../../models')
const Comment = db.Comment
const commentService = require('../../services/commentService')

let commentController = {
  postComment: (req, res) => {
    return commentService.postComment(req, res, data => {
      return res.json(data)
    })
  },
  deleteComment: (req, res) => {
    return commentService.deleteComment(req, res, data => {
      res.json(data)
    })
  }
}

module.exports = commentController
