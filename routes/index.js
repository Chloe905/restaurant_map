// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入路由模組
// 引入 home 模組程式碼
const home = require('./modules/home')
router.use('/', home)

// 引入 restaurants 模組程式碼
const restaurants = require('./modules/restaurants')
router.use('/restaurants', restaurants)

// 匯出路由器
module.exports = router
