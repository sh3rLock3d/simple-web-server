const express = require('express')
const app = express()
var cors = require('cors')
const { response } = require('express')
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    console.log('hello ')
    res.json({msg: 'some message for get'})
})

app.post('/nodejs/sha256', function (req, res) {
    //res.send('POST request to the homepage')
    console.log('post')
    console.log(req.json)
    //var jasonObject = JSON.parse(req.body)
    res.json({msg: 'some message for post'})

})
  
app.listen(port, () => {console.log(`Example app listening at http://localhost:${port}`)})
