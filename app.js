require('dotenv').config();
require('express-async-errors')


const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
})

// products routes
app.use('/api/v1/products', productsRouter)

// 404
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const start = async () => {
    try {
        // Connect to database
        await connectDB(process.env.MONGO_URI)
        app.listen(port)
        console.log(`Server started on port ${port}`)
    } catch (error) {
        console.log(error)
    }
}

start()