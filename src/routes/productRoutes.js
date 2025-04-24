const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/auth');
const {upload} = require("../middlewares/fileStore");

router
  .route('/')
  .get(productController.getProducts)
  .post(
    protect, 
    authorize('admin'),
    upload.fields([
      {
        name:'image',
        maxCount:1
      },
    ]), 
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProductById)
  .put(protect, authorize('admin'), productController.updateProduct)
  .delete(protect, authorize('admin'), productController.deleteProduct);

module.exports = router;