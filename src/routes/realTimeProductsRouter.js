import { Router } from "express"
import { ProductManager } from '../managers/productManager.js'
import { __dirname } from '../utils.js'
const productManager = new ProductManager(__dirname + "/data/products.json")

const router = Router();

router.get('/',  async (req, res) => {
    const products = await productManager.getProducts()
    res.render('realTimeProducts', { products })
})

export default router;