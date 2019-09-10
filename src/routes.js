const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');

const options = {
    url: 'https://api.github.com/repos/fga-eps-mds/2019.2-Git-Breakdown/commits',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'SysVic',
        'X-RateLimit-Limit': 5000
       
    }
};

router.get('/', (req , res) => {
    console.log("home");
    res.send("ok");
});

router.get('/index', (req , res) => {
    console.log("/index requested");
    res.send('ok');
});
var file = fs.createWriteStream('file.txt');
router.get('/commits', (req , res, err) => {
    request.get(options, function(error, response , body){
        
        let json = JSON.parse(body);  
        // console.log(json[0].commit.author.name);
        // console.log(json[0].commit.message);
        // console.log(json[0].commit.author.date);

        fs.appendFile('file.txt', '----------------------' + '\n', (err) =>{
            if(err) throw err;
        })
        fs.appendFile('file.txt', json[0].commit.author.name + '\n', (err) =>{
            if(err) throw err;
        })
        fs.appendFile('file.txt', json[0].commit.message + '\n' , (err) =>{
            if(err) throw err;
        })
        fs.appendFile('file.txt', json[0].commit.author.date  + '\n', (err) =>{
            if(err) throw err;
        })
        fs.appendFile('file.txt','----------------------'  , (err) =>{
            if(err) throw err;
        })
        


        res.send(json);
        
    });
});


module.exports = router;
