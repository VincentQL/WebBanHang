var express = require('express')
var router = express.Router()
const adminController = require('../controllers/adminController')

router.get('/admin/get-product', adminController.getProduct)
router.get('/admin/get-user', adminController.getUser)
router.post('/admin/create-user', adminController.createUser)
router.post('/admin/create-product', adminController.createProduct)

// Login

router.post('/login', adminController.login)


// router.get('/admin/:id/edit', adminController.edit)
// router.put('/admin/:id', adminController.update)

// router.patch('/admin/:id/restore', adminController.restore)

// router.delete('/admin/:id/destroy', adminController.destroy)
// router.delete('/admin/:id/destroyPower', adminController.destroyPower)
// router.post('/admin/create', adminController.create)
// router.post('/admin/handle-form', adminController.handleForm)



router.get('/trashMenu', adminController.trashMenu)













module.exports = router;