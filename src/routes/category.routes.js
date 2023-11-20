const { Router } = require('express')

const CategoryController = require('../controllers/CategoryController')
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization')

const categoryController = new CategoryController()

const categoryRouter = Router()

categoryRouter.get(
  '/',
  categoryController.index
)

module.exports = categoryRouter
