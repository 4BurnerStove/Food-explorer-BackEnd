const knex = require('../database/knex')

class IngredientsController {
  async index(req, res) {
    const {dishes_id} = req.params

    const ingredients = await knex('ingredients').where({dishes_id}).groupBy('ingredient')
    return res.json(ingredients)
  }
}

module.exports = IngredientsController