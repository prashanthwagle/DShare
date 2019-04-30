const express = require('express');
const fs = require('fs');
const request = require('request');
const crypto = require('crypto');


let app = express();
let port = 3001;
let nodeNumber = 1;

//Requests
app.get("/",(req,res)=>{
    res.send(`Node-${nodeNumber} Page.`);
})

app.get('/reqData',(req,res)=>{
    let fileData = getFileData().toString();
    res.send(fileData);
})

app.get('/appendFileData',(req,res)=>{
    let fileData = req.param('data');
    appendFileData(fileData);
    broadcastUpdate(fileData);
    res.send('Updated');
})

app.get('/reqUpdateData',(req,res)=>{
    console.log(`Update from Node-${req.param('node')}`);
    fs.appendFileSync(`node${nodeNumber}.txt`,req.param('data'));
})

//Functions
let init = () => {
    getFSHash((fileDataHash)=>{
        for(let i=0;i<10;i++){
            request.get(`http://127.0.0.1:300${i}`,(error,response,body)=>{
                if(!error){
                    if(i !== nodeNumber){
                        console.log(`Discovered Node ${i}`);
                        requestDataFromNode(i,fileDataHash);
                    }
                }else{
                    //console.log('error');
                }
            })
        }
    });
}

let getFSHash = (callback) => {
    let fileData = fs.readFileSync(`node${nodeNumber}.txt`);
    let hash = crypto.createHash('md5').update(fileData).digest('hex');
    callback(hash);
}

let getFileData = () => {
    let fileData = fs.readFileSync(`node${nodeNumber}.txt`);
    return fileData;
}

let updateFileData = (fileData) => {
    fs.writeFileSync(`node${nodeNumber}.txt`,fileData);
}

let requestDataFromNode = (i,fileDataHash) => {
    request.get(`http://127.0.0.1:300${i}/reqData`,(error,response,body)=>{
        if(!error){
            let remoteFileDataHash = crypto.createHash('md5').update(body).digest('hex');
            if(fileDataHash != remoteFileDataHash){
                updateFileData(body);
                console.log('Updated the File');
            }else{
                console.log(`Not Updated as File Data is Same`);
            }
        }else{
            console.log('Error in Sending Request for Data');
        }
    })
}

let appendFileData = (fileData) => {
    fs.appendFileSync(`node${nodeNumber}.txt`,fileData);
}

let broadcastUpdate = (fileData) => {
    for(let i=0;i<10;i++){
        if(i !== nodeNumber){
            request.get(`http://127.0.0.1:300${i}/reqUpdateData?node=${nodeNumber}&data=${fileData}`,(error,response,body)=>{

            })
        }
    }
}


app.listen(port,()=>{
    console.log(`Node-${nodeNumber} started at ${port}`);
    init();
})