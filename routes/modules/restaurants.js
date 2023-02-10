// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 載入 Restaurant models
const Restaurant = require('../../models/restaurant')

// 定義/restaurants路由
// 新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增餐廳
router.post('/', (req, res) => {
  const userId = req.user._id
  return Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

// 查看單一店詳情
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { error: err.message })
    })
})

// 修改餐廳資訊
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { error: err.message })
    })
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOneAndUpdate({ _id, userId }, req.body, {
    new: true
  })
    .then(() => { res.redirect(`/restaurants/${_id}`) })
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { error: err.message })
    })
})

// 刪除餐廳
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { error: err.message })
    })
})
// 匯出路由
module.exports = router
