// 1. Insert Express by require
const express = require('express')
// 5. Insert express-handlebars by require
const exphbs = require('express-handlebars')
// 載入mongoose
const mongoose = require('mongoose')

// 2. Define server related variable
const port = 3000
const app = express()

// 8. Require package used in the project
const restaurantList = require('./restaurant.json').results

// 非正式環境時使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 連線到mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線失敗
db.on('error', () => {
  console.error('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 6. Set template Engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 7. Set static files
app.use(express.static('public'))

// 3. Set route and handle request and response
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList })
})

app.get('/restaurants/:id', (req, res) => {
  // find回傳搜尋到的值
  // toString 型別轉換再判斷
  const restaurants = restaurantList.find(restaurant => (restaurant.id).toString() === req.params.id)
  res.render('show', { restaurant: restaurants })
})

app.get('/search', (req, res) => {
  // 沒有輸入按送出，redirect 回根目錄
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  const keywords = req.query.keyword // 輸入搜尋欄的字
  const keyword = req.query.keyword.toLowerCase().trim() // 進行比對的字串，轉換成小寫，並剔除空格
  const restaurants = restaurantList.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.category.toLowerCase().includes(keyword)
  })
  // 新增搜尋不到餐廳
  if (!restaurants.length) {
    res.render('cannot_found', { restaurant: restaurantList, keywords })
  } else {
    res.render('index', { restaurant: restaurants, keywords })
  }
})

// 4. Start and listen to server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
