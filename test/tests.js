var assert = require('assert');
const {done} = require('mocha');
var axios = require('axios').default;

const token = "eyJ0eXAiOiAiVENWMiJ9.dlZvMVFtUVRJQWkwYkQ1SmFLVVc3MEtpbnI0.Y2RmNDY1OTgtNTI0MS00NWVhLWI0NzgtNGZjN2I0YjMzMzM2";
const filePath = "../file.txt";
var fileId;


class webAPI{
  uploadFile(userData){
    try{
      const response = axios.post('https://content.dropboxapi.com/2/files/upload', {
        headers: userData.getHeaders,
        data: {
            binary: userData.filePath
        }
      });
      userData.fileId = response.data.id;
      assert.strictEqual(response.status, 200);
      done();
    }catch(err){
      console.log(err);
    }
  }
  getMetadata(userData){
    try{
      const response = axios.post('https://api.dropboxapi.com/2/files/get_metadata', {
        headers: userData.getHeaders,
        data: JSON.stringify({
            'path': userData.filePath,
            'include_media_info': true
        })
      });
      recievedId = response.data.id;
      assert.strictEqual(recievedId, userData.fileId);            
      done();
    }catch(err){
      console.log(err);
    }
  }
  deleteFile(userData){
    try{
      const response = axios.post('https://api.dropboxapi.com/2/files/delete_v2', {
        headers: userData.headers,
        data: JSON.stringify({
            'path': userData.filePath
        })
      });
      assert.strictEqual(response.status, 200);          
      done();
    }catch(err){
      console.log(err);
    }
  }
}

class userData{
  constructor(token, filePath, fileId = ''){
    this.token = token;
    this.filePath = filePath;
    this.fileId = fileId;
  }
  set setHeaders(data){
    this.headers = data;
  }
  get getHeaders(){
    return JSON.parse(this.setHeaders);
  }
}

let uploadTestData = new userData(token, filePath);
let getTestData = new userData(token, filePath);
let deleteTestData = new userData(token, filePath);

uploadTestData.headers = JSON.stringify({
  'Authorization': 'Bearer ' + this.token,
  'Dropbox-API-Arg': JSON.stringify({
      'path': this.filePath,
      'mode': 'add',
      'autorename': true,
      'mute': false,
      'strict_conflict': false
  }),
  'Content-Type': 'application/octet-stream'
});
getTestData.headers = JSON.stringify({
  'Authorization': 'Bearer ' + token,
  'Content-Type': 'application/json',
});
deleteTestData.headers = JSON.stringify({
  'Authorization': 'Bearer ' + token,
  'Content-Type': 'application/json',
});

let tests = new webAPI();
tests.uploadFile(uploadTestData);
tests.getMetadata(getTestData);
tests.deleteFile(deleteTestData);
