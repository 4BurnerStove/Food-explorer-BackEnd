const knex = require('../database/knex')

class FavoritesController {
  async create(req, res) {
    const { user_id, dish_id } = req.body

    const favorite = await knex('favorites').insert({ user_id, dish_id });
    
    res.json(favorite);
  } 

  async delete(req, res){
    const favoriteId = req.params.id
    console.log(favoriteId)
    
    const deletedFavorite = await knex('favorites').where({id: favoriteId}).del()
    res.json(deletedFavorite)
  }
}

module.exports = FavoritesController