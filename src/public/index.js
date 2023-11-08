const socketClient = io()

const form = document.getElementById('form')

const products = document.getElementById('products')

form.onsubmit = (e) => {
    e.preventDefault()
    const title = document.getElementById(title).value
    const description = document.getElementById(description).value
    const price = document.getElementById(price).value
    const thumbnails = document.getElementById(thumbnails).value
    const code = document.getElementById(code).value
    const stock = document.getElementById(stock).value
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