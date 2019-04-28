var http = require("http");
var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser'); 

//path模块，可以生产相对和绝对路径
var path = require("path");

var app = express();

// 递归创建目录 异步方法  
function mkdirs(dirname, callback) {  
    fs.exists(dirname, function (exists) {  
        if (exists) {  
            callback();  
        } else {  
            // console.log(path.dirname(dirname));  
            mkdirs(path.dirname(dirname), function () {  
                fs.mkdir(dirname, callback);  
                console.log('在' + path.dirname(dirname) + '目录创建好' + dirname  +'目录');
            });  
        }  
    });  
}

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  }

//设置静态资源目录
app.use(express.static('./'));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false })); 

app.post('/excute', function(req, res) {
    var fileRootPath = "E:/zgp_work/portal/target/classes/";
    console.log(typeof req.body.inputText);
    var data = req.body.inputText.split("\n");
    console.log(data);
    var outputInfo = [];
    for(var i=0;i<data.length;i++) {
        var fileName = path.basename(data[i]);
        var filePath = 'output/' + path.dirname(data[i]);
        
        mkdirsSync(filePath);

        var fileRealPath = fileRootPath + data[i];
        var destPath = path.join(__dirname, filePath, fileName);

        var readStream = fs.createReadStream(fileRealPath);
        var writeStream = fs.createWriteStream(destPath);
        readStream.pipe(writeStream);
        console.log(destPath);
        console.log("移动完成");
        outputInfo.push(destPath);
    }

    res.writeHead(200,{"Content-Type":'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    res.end(JSON.stringify({code:1, message: "成功",outputInfo: outputInfo}));

    
});

var server = app.listen(8081, function () {
 
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
  });