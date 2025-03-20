const express = require('express');
const {
    showProducts,
    showProductById,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct
} = require('../controlers/productController');  

const authenticateToken = require('../middlewares/authMiddleware'); 

const router = express.Router();


router.get('/', showProducts);  
router.get('/:id', showProductById);  
router.get('/dashboard/new', authenticateToken, showNewProduct);  
router.post('/dashboard', authenticateToken, createProduct);  
router.get('/dashboard/:id/edit', authenticateToken, showEditProduct);  
router.put('/dashboard/:id', authenticateToken, updateProduct);  
router.delete('/dashboard/:id', authenticateToken, deleteProduct);  

module.exports = router;
