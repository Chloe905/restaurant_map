// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 載入 Restaurant models
const Restaurant = require('../../models/restaurant')

// 首頁路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { error: err.message })
    })
})

// 匯出路由
module.exports = router
