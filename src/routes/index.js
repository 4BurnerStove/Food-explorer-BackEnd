const { Router } = require('express')

const usersRouter = require('./users.routes')
const dishesRoutes = require('./dishes.routes')
const favoritesRoutes = require('./favorites.routes')
const ingredientsRoutes = require('./ingredients.routes')
const sessionsRoutes = require('./sessions.routes')
const categoryRoutes = require('./category.routes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/favorites', favoritesRoutes)
routes.use('/category', categoryRoutes)
routes.use('/ingredients', ingredientsRoutes)

module.exports = routes
