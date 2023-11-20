const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload.js')

const DishesController = require('../controllers/DishesController.js')
const DishePictureController = require('../controllers/DishePictureController.js')
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated.js')

const dishesRoutes = Router()

const dishesController = new DishesController()
const dishePictureController = new DishePictureController()

const upload = multer(uploadConfig.MULTER)

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post(
  '/',
  verifyUserAuthorization('admin'),
  upload.single('image'),
  dishesController.create
)

dishesRoutes.put(
  '/:id',
  verifyUserAuthorization('admin'),
  dishesController.update
)

dishesRoutes.get('/', dishesController.index)

dishesRoutes.get(
  '/:id',
  verifyUserAuthorization('admin'),
  dishesController.show
)

dishesRoutes.delete(
  '/:id',
  verifyUserAuthorization('admin'),
  dishesController.delete
)

dishesRoutes.patch(
  '/picture/:id',
  verifyUserAuthorization('admin'),
  upload.single('image'),
  dishePictureController.update
)

module.exports = dishesRoutes
