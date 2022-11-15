// 1. Insert Express by require
const express = require('express')
// 5. Insert express-handlebars by require
const exphbs = require('express-handlebars')
// 載入mongoose
const mongoose = require('mongoose')
// 載入 body-parser
const bodyParser = require('body-parser')
// 載入 restaurant model
const Restaurant = require('./models/restaurant')

// 2. Define server related variable
const port = 3000
const app = express()

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

app.use(bodyParser.urlencoded({ extended: true }))

// 瀏覽全部餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})
// 新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
// 新增餐廳
app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.get('/restaurants/:id', (req, res) => {
  // find回傳搜尋到的值
  // toString 型別轉換再判斷
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(err => console.log(err))
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
