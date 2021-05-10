const { step } = require('mocha-steps');
var assert = require('assert');
const {done} = require('mocha');
var axios = require('axios').default;
var FormData = require('form-data');
const token = "eyJ0eXAiOiAiVENWMiJ9.dlZvMVFtUVRJQWkwYkQ1SmFLVVc3MEtpbnI0.Y2RmNDY1OTgtNTI0MS00NWVhLWI0NzgtNGZjN2I0YjMzMzM2";
const filePath = "../file.txt";
var fileId;

describe("WebAPI Testing", ()=>{
    


    it("Upload file test", (done)=>{
        const uploadUrl = "https://content.dropboxapi.com/2/files/upload";
        axios({
            method: 'post',
            url: uploadUrl,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Dropbox-API-Arg': JSON.stringify({
                    'path': '../file.txt',
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
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                
            },
            data: JSON.stringify({
                'path': '../file.txt',
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
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                
            },
            data: JSON.stringify({
                'path': '../file.txt'
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
    
    
});
