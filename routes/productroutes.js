const { Router } = require('express');
const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    bulkinsert
} = require('../controllers/productController');

let router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

router.post('/prod', bulkinsert);

module.exports = router;