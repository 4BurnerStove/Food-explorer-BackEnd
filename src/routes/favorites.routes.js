const { Router } = require('express')

const FavoritesController = require('../controllers/FavoritesController')

const favoritesRoutes = Router()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated.js')

const favoritesController = new FavoritesController()


favoritesRoutes.use(ensureAuthenticated)

favoritesRoutes.post('/', favoritesController.create)
favoritesRoutes.delete('/remove/:id', favoritesController.delete)

module.exports = favoritesRoutes