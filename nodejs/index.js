const express = require('express')
const app = express()
var cors = require('cors')
const { response } = require('express')

const port = 3000
const crypto = require('crypto');
app.use(express.json());

app.use(cors())





app.get('/nodejs/write', (req, res) => {
    var line_number = req.query.line;
    if (isNaN(line_number)){
        return res.status(400).end('type is not correct');
    }
    line_number = line_number - 1;
    if (line_number < 1 || line_number > 100){
        return res.status(400).end('number is out of index');
    }
    console.log(line_number);
    const nthline = require('nthline'),
    filePath = '/home/ali/Desktop/simple-web-server/nodejs/file-data.txt',
    rowIndex = line_number;
    nthline(rowIndex, filePath).then(line => {console.log(line); res.json({msg: line});});
    
    
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
