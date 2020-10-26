const express = require('express')
const app = express()
var cors = require('cors')
const { response } = require('express')
const port = 3000
const crypto = require('crypto');
app.use(express.json());

app.use(cors())





app.get('/nodejs/write', (req, res) => {
    // is it better using https://stackoverflow.com/questions/34730586/read-nth-line-in-node-js-without-reading-entire-file
    console.log('hello ')
    var line = 1 // todo find how?
    console.log(tmp)
    res.json({msg: 'not implemented yet'})
})

app.post('/nodejs/sha256', function (req, res) {
    //res.send('POST request to the homepage')
    var jasonObject = req.body
    console.log(jasonObject)
    var a = jasonObject['first-num']
    var b = jasonObject['second-num']
    var isnumber = true
    var result = 0
    if (isNaN(a) || isNaN(b)) {
        isnumber = false
        console.log('This is not number');
    } else {
        var c = a + b
        // https://nodejs.org/api/crypto.html
        const secret = 'abcdefg';
        const hash = crypto.createHmac('sha256', secret)
                   .update(c.toString())
                   .digest('hex');
        //console.log(hash);
        result = hash

    }
    res.json({msg: result, isvalid:isnumber})

    

})

app.listen(port, () => {console.log(`Example app listening at http://localhost:${port}`)})
