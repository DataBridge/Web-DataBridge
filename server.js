import express from 'express';
import path from 'path';

const port = process.env.NODE_PORT || 80;
const app = express()

// serve static assets normally
app.use(express.static(__dirname + '/dist'))

app.use('/imgs', express.static(__dirname + '/imgs'))

// Handles all routes so you do not get a not found error
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})


app.listen(port)
console.log("server started on port " + port)