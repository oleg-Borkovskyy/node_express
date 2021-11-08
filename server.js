const express = require('express')

const app = express()

const port = 3000

app.use(express.json())

app.use(errorHandler)

const authorRouter = require('./routes/authors')


app.use('/authors', authorRouter)
//app.use('/posts',postRouter)


app.get('/', (req, res) => {
    res.send('Hello node')
})

function errorHandler( err, req, res, next ) {
    if ( err.status ) {
        res.status(err.status).json({err:err.massege})
        return
    }
    res.sendStatus(500)
}


app.listen(port, () => {
    console.log(`server listening on ${port}....`)
}
)