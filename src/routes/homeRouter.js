import { Router } from "express"
import { ProductManager } from "../managers/productManager.js";

const productManager = new ProductManager('./src/data/products.json')
const router = Router()

router.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    res.render('home', { products })
})

export default router