// Insert Express、express-handlebars、mongoose、body-parser、
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// 載入 restaurant model
const Restaurant = require('./models/restaurant')
// 載入路由
const routes = require('./routes')
// 2.Define server related variable
const port = 3000
const app = express()

// 非正式環境時使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 連線到mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

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

// Set template Engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// 搜尋餐廳
app.get('/search', (req, res) => {
  // 沒有輸入按送出，redirect 回根目錄
  if (!req.query.keyword) { return res.redirect('/') }

  const keywords = req.query.keyword // 輸入搜尋欄的字
  const keyword = req.query.keyword.toLowerCase().trim() // 進行比對的字串，轉換成小寫，並剔除空格

  const { sort } = req.query
  const sortBy = {
    default: { _id: 'asc' },
    AtoZ: { name: 'asc' },
    ZtoA: { name: 'desc' },
    category: { category: 'asc' },
    location: { location: 'asc' }
  }
  Restaurant.find()
    .lean()
    .sort(sortBy[sort])
    .then((restaurant) => {
      const restaurants = restaurant.filter(data => {
        return data.name.toLowerCase().includes(keyword) ||
          data.category.toLowerCase().includes(keyword)
      })

      // 新增搜尋不到餐廳
      if (!restaurants.length) {
        res.render('cannot_found', { restaurant, keywords })
      } else {
        res.render('index', { restaurants, keywords })
      }
    })
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { error: err.message })
    })
})

// 排序餐廳
app.get('/sort', (req, res) => {
  console.log(req.query.sort)
  Restaurant.find()
    .lean()
    .sort({ name: 'asc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { error: err.message })
    })
})
// 4. Start and listen to server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
