// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 載入 Restaurant models
const Restaurant = require('../../models/restaurant')

// 搜尋路由
router.get('/', (req, res) => {
  // 沒有輸入按送出，redirect 回根目錄
  if (!req.query.keyword) { return res.redirect('/') }
  const userId = req.user._id
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

  Restaurant.find({ userId })// 加入查詢條件
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

// 匯出路由
module.exports = router
