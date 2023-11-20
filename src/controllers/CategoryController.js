const knex = require('../database/knex')

class CategoryController {
  async index(req, res) {
    const category = await knex('category').groupBy('id')

    return res.json(category)
  }
}

module.exports = CategoryController
