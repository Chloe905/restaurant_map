// Insert Express、express-handlebars、mongoose、body-parser、
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// 載入 restaurant model
const Restaurant = require('./models/restaurant')
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

// 查看單一店詳情
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(err => console.log(err))
})

// 修改餐廳資訊
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => { res.redirect(`/restaurants/${id}`) })
    .catch(err => console.log(err))
})

// 刪除餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 搜尋餐廳
app.get('/search', (req, res) => {
  // 沒有輸入按送出，redirect 回根目錄
  if (!req.query.keyword) { return res.redirect('/') }

  const keywords = req.query.keyword  // 輸入搜尋欄的字
  const keyword = req.query.keyword.toLowerCase().trim() // 進行比對的字串，轉換成小寫，並剔除空格

  Restaurant.find()
    .lean()
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
    .catch(err => console.log(err))
})

// 4. Start and listen to server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
