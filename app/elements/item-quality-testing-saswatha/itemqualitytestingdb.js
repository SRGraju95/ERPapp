var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.testingdata=function(getgrnnumber,callback){

 connection.query("select t1.item_id,t2.quality_parameter_id from od_inward_item_register as t1   join config_quality_parameter_type_flag_detail as t2 on t1.item_id = t2.item_id where inward_register_number='"+getgrnnumber+"'",function(err,rows){
   if(!err){
    //  console.log(rows);
      return callback(rows);
  }
  else{
      return callback("reject");
  }
    });
}
