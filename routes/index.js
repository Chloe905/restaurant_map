// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()


const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/users', users)

// 匯出路由器
module.exports = router
