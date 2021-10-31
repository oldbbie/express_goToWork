var express = require('express');
var router = express.Router();

var template = require('../lib/template');
var db = require('../lib/db.js');

router.get('/',function(request,response,next){
	var showCalendar = new Date();
	var firstMonth = new Date(showCalendar);
	firstMonth.setDate(1);
	var nextMonth = new Date(firstMonth);
	nextMonth.setMonth(firstMonth.getMonth() + 1 );
	db.query(`
		SELECT a.day,e.name 
		FROM attend AS a 
		LEFT JOIN employee AS e 
		ON e.id = a.employee_id  
		WHERE employee_id = ?
		AND a.day >= ?
		AND a.day < ?
		ORDER BY a.day
	`, [1,firstMonth,nextMonth] , function (err, attend) {
		var js = template.js(showCalendar,showCalendar.getDate(),0,attend);
		var html = template.html(js);
		response.send(html);
	})
})

router.get('/:moveMon',function(request,response,next){
	var showCalendar = new Date();
	showCalendar.setDate(1);
	showCalendar.setMonth(showCalendar.getMonth() + Number(request.params.moveMon));
	var firstMonth = new Date(showCalendar);
	var nextMonth = new Date(firstMonth);
	nextMonth.setMonth(firstMonth.getMonth() + 1 );
	db.query(`
		SELECT a.day,e.name 
		FROM attend AS a 
		LEFT JOIN employee AS e 
		ON e.id = a.employee_id  
		WHERE employee_id = ?
		AND a.day >= ?
		AND a.day < ?
		ORDER BY a.day
	`, [1,firstMonth,nextMonth] , function (err, attend) {
		var js = template.js(showCalendar,showCalendar.getDate(),request.params.moveMon,attend);
		var html = template.html(js);
		response.send(html);
	})
})

module.exports=router;