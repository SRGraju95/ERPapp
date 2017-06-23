var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var jsonfile   = require('jsonfile');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


var server=app.listen(1000,'127.0.0.1',function(err){
  var host=server.address().address;
  var port=server.address().port;
  if(!err){
    console.log("Listening at http://%s:%s", host, port);
  }
  else {
    console.error(err);
  }
})


var connection;
    global.connection=mysql.createConnection({
      host:'localhost',
      port:'3306',
      user:'root',
      password:'admin',
      database:'test'
    });
    global.connection.connect(function(err){
      if(!err){
        console.log("Connected with database");
      }
      else {
        console.log("Failed to connect with database!");
      }
    });

app.use(express.static('app'));

app.get('/' ,function (req, res) {
  res.sendFile( "app/index.html" );
});
app.post('/chart_testing_info', urlencodedParser, function (req, res) {
  global.connection.query("SELECT * FROM od_sales_sales_order_detail WHERE status IN ('fullfilled', 'partially fullfilled')",function(err,rows){
    res.status(200).json({'returnval': rows});
  });
});
app.post('/salesorder_chart_info', urlencodedParser, function (req, res) {
  global.connection.query("select * from od_sales_sales_order_detail where required_delivery_date between '"+req.query.starting_date+"' and '"+req.query.ending_date+"' order by required_delivery_date desc",function(err,rows){
    if(!err){
      console.log(JSON.stringify(rows,null,1));
      res.status(200).json({'returnval': rows});
    }
    else {
      console.log(err);
      res.status(200).json({'returnval': "can't get rows"});
    }
  });
});
//   console.log("calliung");
//   	global.connection.query("SELECT * FROM od_inward_item_register where status='stores'",function(err,rows1){
//       if(!err){
//         global.connection.query("SELECT * FROM od_inward_item_register where status='quality'",function(err,rows2){
//           if(!err){
//             var concat_row1=[];
//             concat_row=rows1.concat(rows2);
//             global.connection.query("SELECT * FROM od_inward_item_register where status='purchase'",function(err,rows3){
//               var concat_row2=[];
//               concat_row2=concat_row.concat(rows3);
//               // console.log(JSON.stringify(concat_row2));
//               res.status(200).json({'returnval': concat_row2});
//             });
//           }
//         })
//         // console.log(JSON.stringify(rows));
//         // res.status(200).json({'returnval': rows});
//       }
//       else {
//         res.status(200).json({'returnval': "not get"});
//       }
//
// });
// });
