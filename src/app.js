import express from 'express'
import handlebars from 'express-handlebars'
import homeRouter from './routes/homeRouter.js'
import realTimeProductsRouterrouter from './routes/realTimeProductsRouter.js'
import { Server } from "socket.io"
import { ProductManager } from './managers/productManager.js'
const productManager = new ProductManager(__dirname + "/data/products.json")
import { __dirname } from './utils.js'

const app = express()
const httpServer = app.listen(8080)
const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + "/public"))

app.use('/home', homeRouter)
app.use('/realtimeproducts', realTimeProductsRouterrouter)

socketServer.on('connection', async(socket) => {
    socket.on('newProduct', async(product) => {
        await productManager.addProduct(product)
        const productsList = await productManager.getProducts()
        socketServer.emit('allProducts', productsList)
    })
    const productsList = await productManager.getProducts()
    socketServer.emit('allProducts', productsList)
})




