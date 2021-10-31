var express = require('express');
//var bodyParser = require('body-parser'); // post로 받은 파일처럼 용량이 큰 데이터 처리(코드줄이기)
//var session = require('express-session');
//var FileStore = require('session-file-store')(session);

//var db = require('./lib/db');
var indexRouter = require('./routers/index');
var app = express();

//app.use(bodyParser.urlencoded({ extended:false }));

//app.use(session({ 
//    secret: 'keyboard cat',
//    resave:false,
//    saveUninitialized:true
//}));

app.use('/css',express.static('public/css'));
app.use('/js',express.static('public/js'));
//app.use('/img',express.static('public/img'));

app.use('/',indexRouter);

app.use(function(request,response,next){
	response.status(404).send('페이지가 없습니다.');
})

app.use(function(err,request,response,next){
	console.error(err.stack);
	response.status(500).send('에러가 났습니다.');
})

app.listen(3000,function(){
	return console.log('동작중');
});