var assert = require('assert');
const {done} = require('mocha');
var axios = require('axios').default;

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