const db = require('../../config/mongoose')
const Restaurant = require('../restaurant') // 載入restaurant model
const restaurantList = require('../../restaurant.json').results // 載入restaurant.json當種子資料

// 連線成功
db.once('open', () => {
  console.log('mongodb connected on seeder!')

  Restaurant.create(...restaurantList)
    .then(() => {
      console.log('restaurant seeder done')
      db.close()
    })
    .catch(err => console.log(err))
})
