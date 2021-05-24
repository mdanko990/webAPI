import webAPI from 'webAPIClass.js';
import userData from 'userDataClass.js';

const token = "eyJ0eXAiOiAiVENWMiJ9.dlZvMVFtUVRJQWkwYkQ1SmFLVVc3MEtpbnI0.Y2RmNDY1OTgtNTI0MS00NWVhLWI0NzgtNGZjN2I0YjMzMzM2";
const filePath = "../file.txt";

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