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