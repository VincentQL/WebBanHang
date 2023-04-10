var express = require('express')
var router = express.Router()
const adminController = require('../controllers/adminController')

// Get
router.get('/admin/get-product', adminController.getProduct)
router.get('/admin/get-user', adminController.getUser)
router.get('/admin/get-bill', adminController.getBill)
// Post
router.post('/admin/create-user', adminController.createUser) // path 
router.post('/admin/create-product', adminController.createProduct)
router.post('/admin/create-bill', adminController.createBill)

// Put
router.put('/admin/product/:type/:id', adminController.updateProduct)
router.put('/admin/:id/edit-user', adminController.editUserByID)
router.put('/admin/:id/update-bill', adminController.updateBill)

// delete

router.delete('/admin/:id/delete-user', adminController.deleteUser)
router.delete('/admin/:type/:id/delete-product', adminController.deleteProduct)


// post get put delete 

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