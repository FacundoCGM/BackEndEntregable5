const socketClient = io()

const form = document.getElementById('form')

const products = document.getElementById('products')

const SEND = (event) => {
    event.preventDefault()
    const dataForm = new FormData(form)
    const title = dataForm.get('title')
    const description = dataForm.get('description')
    const price = dataForm.get('price')
    const thumbnails = dataForm.get('thumbnails')
    const code = dataForm.get('code')
    const stock = dataForm.get('stock')
    const product = {
        title: title,
        description: description,
        price: price,
        thumbnails: thumbnails,
        code: code,
        stock: stock
    }
    socketClient.emit('newProduct', product)
}

socketClient.on('allProducts', (productsList) => {
    products.innerHTML = ''
    let infoProducts = ''
    productsList.forEach(p => {
        infoProducts += `<p>${p.title} </p></br>`
    })
    products.innerHTML += infoProducts
})

socketClient.on('productAdded', (productsList) => {
    products.innerHTML = ''
    let infoProducts = ''
    productsList.forEach(p => {
        infoProducts += `<p>${p.title} </p></br>`
    })
    products.innerHTML += infoProducts
})