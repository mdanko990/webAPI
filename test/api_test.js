const { step } = require('mocha-steps');
var assert = require('assert');
const {done} = require('mocha');
var axios = require('axios').default;
var FormData = require('form-data');
const ApiToken = "vatdo2fJhpsAAAAAAAAAAe6zK50tBmPmhi0wCc3mE7RiU3ZXJJHJDBvO2u7lc2St";
const filePath = "../resourses/Kitten.png";
var fileId;

describe("WebAPI Testing", ()=>{
    


    it("Upload file test", (done)=>{
        const uploadUrl = "https://content.dropboxapi.com/2/files/upload";
        axios({
            method: 'post',
            url: uploadUrl,
            headers: {
                'Authorization': 'Bearer ' + ApiToken,
                'Dropbox-API-Arg': JSON.stringify({
                    'path': '/test/kitten.png',
                    'mode': 'add',
                    'autorename': true,
                    'mute': false,
                    'strict_conflict': false
                }),
                'Content-Type': 'application/octet-stream'
            },
            data: {
                binary: filePath
            }
            
        })
        .then((response) =>{
            fileId = response.data.id;
            assert.strictEqual(response.status, 200);
            done();            
        })
        .catch((err) => {
            console.log(err);
        });
    });

    it("Get metadata test", (done)=>{
        const metadataUrl = "https://api.dropboxapi.com/2/files/get_metadata";
        axios({      
            method: 'post',      
            url: metadataUrl,
            headers: {
                'Authorization': 'Bearer ' + ApiToken,
                'Content-Type': 'application/json',
                
            },
            data: JSON.stringify({
                'path': '/test/kitten.png',
                'include_media_info': true
            })
        })
        .then((response) =>{
            recievedId = response.data.id;
            assert.strictEqual(recievedId, fileId);            
            done();
        })
        .catch((err) => {
            console.log(err);
        });
    });

    it("Delete file test", (done)=>{
        const metadataUrl = "https://api.dropboxapi.com/2/files/delete_v2";
        axios({      
            method: 'post',      
            url: metadataUrl,
            headers: {
                'Authorization': 'Bearer ' + ApiToken,
                'Content-Type': 'application/json',
                
            },
            data: JSON.stringify({
                'path': '/test/kitten.png'
            })
        })
        .then((response) =>{
            assert.strictEqual(response.status, 200);          
            done();
        })
        .catch((err) => {
            console.log(err);
        });
    });
    
    
})