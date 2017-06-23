var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var jsonfile   = require('jsonfile');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var connection;
var connectdb=require("./app/script/connectdb.js");
  require('fs').readFile('./app/config/getconnection.json','utf8',function(err,data){
    dbjson=JSON.parse(data);
    global.connection=mysql.createConnection({
      host:dbjson[0].host,
      port:dbjson[0].port,
      user:dbjson[0].user,
      password:dbjson[0].password,
      database:dbjson[0].database
    });
    global.connection.connect(function(err){
      if(!err){
        console.log("Connected with database");
      }
      else {
        console.log("Failed to connect with database!");
      }
    });
  });

app.use(express.static('app'));

app.get('/' ,function (req, res) {
  res.sendFile( "app/index.html" );
});
//login-card
app.post('/login', urlencodedParser, function (req, res) {
  var response={
    emp_id:req.query.empid,
    password:req.query.password
  };
  var role;
  	global.connection.query("SELECT * FROM od_hr_employee_role where emp_id='"+req.query.empid+"' and password='"+req.query.password+"'",function(err,rows){
  	if(rows.length>0){
      global.role=rows[0].role;
      var roleid=rows[0].role_id;
      global.connection.query("select * from service_config_login_menu where menu_id in(SELECT menu_id FROM menu_map where role_id='"+roleid+"')",function(err,rows){
        res.status(200).json({'returnval': rows,'role':global.role});
        });
      }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
  });
});
//**********************************ITEM DETAILS PROCESSES
//add item search process
app.post('/searchitem', urlencodedParser, function (req, res) { //add item search process
  itemdetailsdb.searchitem(req.query.name,function(itemdetails,suppliers){
    if(itemdetails||suppliers!=null)
      res.status(200).json({'returnval':itemdetails,'returnval1':suppliers});
    else
      res.status(200).json({'returnval':"No Data"});
  });
});
// vehicle securitycard
app.post('/securityinfo', urlencodedParser, function (req, res) {
  connectdb.securityjsonsaveFn(req.query.invNum,req.query.saleid,req.query.invDate,req.query.delqunty,
    req.query.vehouttime,function(err,rows){
    if(rows="json writed"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Json not writed"});
  });
  });

//supplier item
  app.post('/supplieritempostinfo', urlencodedParser, function (req,res) {
    var response={supplier_id:req.query.supid,
                  item_id:req.query.itemid};
      connectdb.supplieritempostFn(response,function(rows){
        if(rows=="saved"){
          res.status(200).json({'returnval': rows});
        }
        else
          res.status(200).json({'returnval': "not saved"});
      });
      });

  //customer item
  app.post('/customeritempostinfo', urlencodedParser, function (req,res) {
        var response={customer_id:req.query.cupid,
                      item_id:req.query.itemid};
                      console.log(response);
          connectdb.customeritempostFn(response,function(rows){
            if(rows=="saved"){
              res.status(200).json({'returnval': rows});
            }
            else
              res.status(200).json({'returnval': "not saved"});
          });
          });

  //searchsupplier
  app.post('/searchsupplierid', urlencodedParser, function (req,res) {
          var response={supname:req.query.supname};
          console.log(response);
          connectdb.searchsupplieridFn(response,function(rows){
            if(rows!="not get"){
          if(rows.length>0){
            res.status(200).json({'returnval': rows});
                }
              }
          else
            res.status(200).json({'returnval': "does not get supplier details"});
            });
        });
        app.post ('/autogenerateid', urlencodedParser, function (req, res) {
          connectdb.generateIdFn(function(retrievedData){
            if(retrievedData>=0)
              res.status(200).json({'returnid': retrievedData});
            else
              res.status(200).json({'returnid': "No ID to Generate!"});
          });
        });
//searchcustomer
app.post('/searchcustomerid', urlencodedParser, function (req,res) {
          var response={supname:req.query.supname}
          connectdb.searchcustomeridFn(response,function(rows){
            if(rows!="not get"){
          if(rows.length>0){
            res.status(200).json({'returnval': rows});
                }
              }
          else
            res.status(200).json({'returnval': "please enter valid customer_name"});
            });
        });
// supplier item mapping
app.post('/supplieritem_map', urlencodedParser, function (req,res) {
  connectdb.supplieritem_mapFn(function(rows){
    if(rows.length>0){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "didn't get value"});
  });
  });

  //customer item mapping
  app.post('/customeritem_map', urlencodedParser, function (req,res) {
    connectdb.customeritem_mapFn(function(rows){
      if(rows.length>0){
        res.status(200).json({'returnval': rows});
      }
      else
        res.status(200).json({'returnval': "didn't get value"});
    });
    });

    //auto security search
app.post('/autosecuritysearchinfo', urlencodedParser, function (req,res) {
  connectdb.autosecuritysearchFn(function(rows){
    if(rows!="reject"){
      // console.log(rows);
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "does not get vehicleno"});
  });
  });

  //security search
  app.post('/securitysearchinfo', urlencodedParser, function (req,res) {
    connectdb.securitysearchFn(req.query.searchvehiclenum,function(rows){
      if(rows!="reject"){
        // console.log("correct"+JSON.stringify(rows));
        res.status(200).json({'returnval': rows});
      }
      else
        res.status(200).json({'returnval': "does not get vehicel no"});
    });
    });

//CEO customer

app.post('/ceocustomerapprovalinfo', urlencodedParser, function (req, res) {
var response={customer_id:req.query.cuid,
              status:req.query.radio};
connectdb.ceocustomeapprovalFn(response,function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "customer table doesn't updated"});
});
});


app.post('/ceocustomerajaxinfo', urlencodedParser, function (req, res) {
connectdb.ceocustomerajaxFn(function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "ceo-customer-card.json not created"});
});
});

//vehicle fetch
app.post('/vehiclefetch', urlencodedParser, function (req, res) {
connectdb.vehiclefetch(function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "vehicle.json not created"});
});
});

//search sales order
app.post('/searchsalesorder', urlencodedParser, function (req, res) {
connectdb.searchsalesorderconncetdbFn(req.query.vehno,function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "Invalid salesordercreate id"});
});
});

//vehicle IN
app.post('/vehsavedata', urlencodedParser, function (req, res) {
var response={
  vehnoval:req.query.VehicleNoval,
  drivnameval:req.query.DriverNameval,
  drivmobnoval1:req.query.DriverMobNumberval1,
  drivmobnoval2:req.query.DriverMobNumberval2,
  ownmobnumberval:req.query.OwnMobNumberval,
  vehtimeval:req.query.Vehintimeval,
  vehtime2val:req.query.Vehoutimeval,
  vehdateval:req.query.Vehdateval
};

connection.query('INSERT INTO vehicle_table SET ?',[response],function(err,result){
  if(!err)
    res.status(200).json({'datavalue': "Saved!"});
  else
    res.status(200).json({'datavalue': "Unable to save!"});
  });
});

// customer data
app.post('/savedata', urlencodedParser, function (req, res) {
  var response={
    customer_id:req.query.sidval,
  	customer_name:req.query.snameval,
  	address_1:req.query.adval1,
  	address_2:req.query.adval2,
    address_3:req.query.adval3,
    city:req.query.citynameval,
    state:req.query.stateVal,
    country:req.query.countryVal,
    pincode:req.query.pinval,
    mobile_1:req.query.mobnumval1,
    mobile_2:req.query.mobnumval2,
    email:req.query.emidval,
    status:req.query.statusval
  };
  connectdb.savecustomertdetFn(response,function(result){
    if(result=="saved"){
      res.status(200).json({'datavalue': "Saved!"});
    }
    else {
      res.status(200).json({'datavalue': "not Saved!"});
    }
  });
});
//supplier data
app.post('/savesupplierdata', urlencodedParser, function (req, res) {
  var response={
    supplier_id:req.query.sidval,
  	supplier_name:req.query.snameval,
  	address_1:req.query.adval1,
  	address_2:req.query.adval2,
    	address_3:req.query.adval3,
    	city:req.query.citynameval,
    	state:req.query.stateVal,
    	country:req.query.countryVal,
    	pincode:req.query.pinval,
    	mobile_1:req.query.mobnumval1,
    	mobile_2:req.query.mobnumval2,
    	email:req.query.emidval,
    	status:req.query.statusval
  };
  connectdb.savesupplierdetFn(response,function(result){
    if(result=="saved"){
      res.status(200).json({'datavalue': "Saved!"});
    }
    else {
      res.status(200).json({'datavalue': "Saved!"});
    }
  });
});
app.post('/savecontaineridinfo', urlencodedParser, function (req,res) {
  var response={inward_register_number:req.query.grnnumber,
                container_id:req.query.containerid,
                container_number:req.query.Containerno,
                heat_number:req.query.heat_no_val,
                batch_number:req.query.btnoVal,
                quantity:req.query.quantityVal,
                po_number:req.query.po_number,
                po_date:req.query.po_date
                };
    connectdb.savecontaineridFn(response,function(rows){
      if(rows=="saved"){
        res.status(200).json({'returnval': rows});
      }
      else
        res.status(200).json({'returnval': "not saved"});
    });
    });

app.post('/searchcontainer_details_for_purchase_info', urlencodedParser, function (req,res) {
    connectdb.searchcontainer_details_for_purchase_Fn(req.query.searchgrn_number,function(rows){
      if(rows!="can't get rows"){
        res.status(200).json({'returnval': rows});
      }
      else
        res.status(200).json({'returnval': rows});
    });
    });
app.post('/updatecontaineridinfo', urlencodedParser, function (req,res) {
    connectdb.updatecontaineridFn(req.query.db_update_name,req.query.updategrnnumber,req.query.updateitemquantity,req.query.updatecontaineriquantitycount,req.query.po_number,req.query.po_date,function(rows){
      if(rows=="updated"){
        // console.log("updated");
        res.status(200).json({'returnval': rows});
      }
      else
        res.status(200).json({'returnval': "din't updated"});
    });
    });

app.post('/updatecontainer_to_slider_info', urlencodedParser, function (req,res) {
  var response={inward_register_number:req.query.grnnumber,
                containerno:req.query.cntnoVal,
                test_id:req.query.qid};
    connectdb.updatecontainer_to_slider_Fn(response,function(rows){
      if(rows=="saved"){
        res.status(200).json({'returnval': rows});
      }
      else
        res.status(200).json({'returnval': "not saved"});
    });
    });
//sales vehicle order
app.post('/savesalesvehicleorder', urlencodedParser, function(req,res) {
var response={goods_vehicle_number:req.query.vehno,
              salesorder_id:req.query.salid
              };
              // console.log(JSON.stringify(response));
  connectdb.savesalesorderconncetdbFn(response,function(data){
  if(data="saved"){
  res.status(200).json({'returnval': "data saved"});
}
  else{

  res.status(200).json({'returnval': "data not saved"});
}
});
});
app.post('/autocompleteitem', urlencodedParser, function (req, res) {
// console.log("select distinct finishedgoods_itemtype.itemid,UPPER(finishedgoods_itemtype.itemname) as itemname FROM finishedgoods_itemtype inner join item_customer_map on item_customer_map.itemid=finishedgoods_itemtype.itemid inner join salesordercreate on salesordercreate.customerid = item_customer_map.customerid where salesordercreate.customerid='"+req.query.customerid+"'");
  global.connection.query("select distinct finishedgoods_itemtype.item_id,UPPER(finishedgoods_itemtype.itemname) as itemname FROM finishedgoods_itemtype inner join item_customer_map on item_customer_map.item_id=finishedgoods_itemtype.item_id inner join salesordercreate on salesordercreate.customer_id = item_customer_map.customer_id where salesordercreate.customer_id='"+req.query.customerid+"'",function(err,rows){
  if(rows.length>0){
    // console.log("here:"+JSON.stringify(rows));
    res.status(200).json({'returnval': rows});
    }
  else
    res.status(200).json({'returnval': "Invalid!"});
  });
});

app.post('/stores', urlencodedParser, function (req,res) {
  // console.log("strores");
    connectdb.storeFn(function(rows){
      if(rows!="reject"){
        res.status(200).json({'returnval': rows});
      }
      else
        res.status(200).json({'returnval': "does not get saleid"});
    });
    });
    app.post('/purchase', urlencodedParser, function (req,res) {
      connectdb.purchaseFn(function(rows){
        if(rows!="reject"){
          res.status(200).json({'returnval': rows});
        }
        else
          res.status(200).json({'returnval': "does not get saleid"});
      });
      });
app.post ('/itempurchaseordernumber', urlencodedParser, function (req, res) {
  console.log(req.query.item_id);
  connectdb.getItemPurchaseOrderNumers(req.query.item_id, function(itdata){
    if(itdata.length>0)
      res.status(200).json({'itdata': itdata});
    else
      res.status(200).json({'itdata': "No Data!"});
  });
});

      app.post('/quality', urlencodedParser, function (req,res) {
        connectdb.qualityFn(function(rows){
          if(rows!="reject"){
            res.status(200).json({'returnval': rows});
          }
          else
            res.status(200).json({'returnval': "does not get saleid"});
        });
        });
      app.post('/searchheatnoinfo', urlencodedParser, function (req,res) {
        connectdb.searchheatnoFn(req.query.heatno,function(rows){
          if(rows!="No ID Found to Generate"){
            res.status(200).json({'returnval': rows});
          }
          else{
            res.status(200).json({'returnval': rows});
          }
        });
        });
        app.post('/insert_ht_bt_noinfo', urlencodedParser, function (req,res) {
          var response={heat_number:req.query.heatno,
                        batch_number:req.query.batchno};
          connectdb.insert_ht_bt_noFn(response,function(rows){
            if(rows=="inserted"){
              res.status(200).json({'returnval':rows});
            }
            else{
              res.status(200).json({'returnval': rows});
            }
          });
          });
          app.post ('/saveactual', urlencodedParser, function (req, res) {
            connectdb.qtest(req.query.id,req.query.actualvalue,req.query.status,req.query.containerno,req.query.grnnumber,function(callback){
              if(callback=="Saved"){
                console.log(callback);
                res.status(200).json({'serverres': "Saved"});
              }
              else
                res.status(200).json({'serverres': "Not Saved!"});
            });
          });
app.post('/autocompletecustomer_name', urlencodedParser, function (req, res) {
  global.connection.query("SELECT UPPER(customer_name) as customer_name,customer_id FROM md_sales_customer_detail",function(err,rows){
    // console.log("adfasf:"+JSON.stringify(rows,null,1));
  if(rows.length>0){
    // console.log("here:"+JSON.stringify(rows,null,1));
    res.status(200).json({'returnval': rows});
    }
  else
    res.status(200).json({'returnval': "Invalid!"});
  });
});
app.post('/autocompletesupplier_name', urlencodedParser, function (req, res) {
  global.connection.query("SELECT UPPER(supplier_name) as supplier_name,supplier_id FROM md_procurement_supplier_detail",function(err,rows){
  if(rows.length>0){
    res.status(200).json({'returnval': rows});
    }
  else
    res.status(200).json({'returnval': "Invalid!"});
  });
});

app.post ('/searchitemnames', urlencodedParser, function (req, res) {
  connectdb.searchitem(req.query.role,function(itemnames){
    if(itemnames.length>0)
      res.status(200).json({'itemnames': itemnames});
    else
      res.status(200).json({'itemnames': "No Data!"});
  });
});
app.post ('/searchpurchase_requestitem', urlencodedParser, function (req, res) {
  connectdb.getpurchase_requestitem(req.query.itemname,function(itemdetails){
    if(itemdetails.length>0)
      res.status(200).json({'itemdetails': itemdetails});
    else
      res.status(200).json({'itemdetails': "No Data!"});
  });
});

app.post ('/purchase_requestsave', urlencodedParser, function (req, res) {
  connectdb.savepurchase_request(req.query.purchase_requestid,req.query.iid,req.query.selectedtype,req.query.itemspec1,req.query.whlocation,req.query.selectedcontainer,req.query.itemcontainerquantity,req.query.itemquantity,req.query.purchase_requestdate,req.query.requireddate,req.query.supplier_name,function(response){
    if(response=="Saved")
      res.status(200).json({'status': "Saved"});
    else
      res.status(200).json({'status': "Not Saved!"});
  });
});
app.post ('/purchase_requestapproval', urlencodedParser, function (req, res) {
  connectdb.searchpurchase_request(req.query.role,function(purchase_requests){
    if(purchase_requests!=null)
      res.status(200).json({'purchase_requests': purchase_requests});
    else
      res.status(200).json({'purchase_requests': "No purchase_requests!"});
  })
});

app.post('/purchase_requestresponse', urlencodedParser, function (req, res) {
  connectdb.purchase_requestresponse(req.query.intnumber,req.query.respond,function(callback){
    if(callback=="Updated"){
      res.status(200).json({'returnval': "Updated"});
    }
    else{
      res.status(200).json({'returnval': "Not Updated!"});
    }
  });
});
app.post('/purcahseorder_Create', urlencodedParser, function (req, res) {
  connectdb.purcahseorder_CreateFn(function(callback){
    if(callback!="Not select"){
      res.status(200).json({'returnval': callback});
    }
    else{
      res.status(200).json({'returnval': callback});
    }
  });
});
app.post('/p_o_create_info', urlencodedParser, function (req, res) {
  var response={purchase_order_number:req.query.po_number,
                purchase_order_date:req.query.po_date,
                supplier_id:req.query.supplier_id,
                po_price:req.query.per_unit_price,
                item_id:req.query.item_id,
                purchase_order_type_id:req.query.item_type_id,
                item_quantity:req.query.item_quantity,
                reference_id:req.query.reference_id,
                warehouse_stores_id:req.query.warehouse_stores_id,
                status:req.query.status
              };
              var response1={
                  purchase_order_number:req.query.po_number,
                  purchase_order_date:req.query.po_date,
                  purchase_request_number:req.query.pr_number,
                  item_quantity:req.query.item_quantity,
                  unit_of_measure_id:req.query.unit_of_measure_id,
                  per_unit_price:req.query.per_unit_price,
                  total_price:req.query.totalprice,
                  supplier_add1:req.query.supplier_add1,
                  supplier_add2:req.query.supplier_add2,
                  suppier_mob_no:req.query.suppier_mob_no,
                  suppier_email_id:req.query.suppier_email_id,
                  suppier_city:req.query.suppier_city,
                  supplier_name:req.query.supplier_name,
                  itemname:req.query.itemname,
                  check_status:req.query.check_status
                };

  connectdb.p_o_create_Fn([response],[response1],function(callback){
    if(callback=="insert and update"||callback=="inserted"){
      res.status(200).json({'returnval': callback});
    }
    else{
      res.status(200).json({'returnval': callback});
    }
  });
});

app.post('/send_mail_info', urlencodedParser, function (req, res) {
  var response={purchase_order_number:req.query.po_number,
                suppier_email_id:req.query.suppier_email_id};
  connectdb.send_mail_db_Fn([response],function(mail){
    if(mail=="send mail"){
      res.status(200).json({'returnval':"mail send"});
    }
    else {
      res.status(200).json({'returnval':"mail doesn't send"})
      }
  });
});
app.post('/pricing_strategy', urlencodedParser, function (req, res) {
  var tablename=req.query.tablename;
  var filedname=req.query.fieldname;
  var idname=req.query.idname;
  var itemid=req.query.itemid;
  global.connection.query("select pricing from "+tablename+" where "+filedname+"='"+idname+"' and item_id='"+itemid+"'",function(err,rows){
    if(!err){
      res.status(200).json({'returnval': rows});
    }
    else{
      res.status(200).json({'returnval': rows});
    }
  });
});


// ***quality-parameter-type-value-service ******
// var qualityvalueservicefetchpath=require("./app/elements/quality-parameter-type-value-service/qualityservicedb.js");
app.post('/qualityvalueservicefetch', urlencodedParser, function (req, res) {
connectdb.qualityvalueservicefetch(req.query.itemid_get,req.query.qualityid_get,function(rows){
// console.log(req.query.minimumvalue);
   if(rows!="reject"){
     res.status(200).json({'returnval': rows});
   }
   else
     res.status(200).json({'returnval': "Invalid!"});
 });
});
// ** flag 0quality-parameter-range-type-value-service ******
// var qualityrangevalueservicepath=require("./app/elements/quality-parameter-range-value-service/qualityrangevalueservicedb.js");
app.post('/qualityrangevalueservice', urlencodedParser, function (req, res) {
connectdb.qualityrangevalueservice(req.query.itemid_get,req.query.qualityid_get,req.query.flagvalue,function(rows){
// console.log(req.query.minimumvalue);
   if(rows!="reject"){
     res.status(200).json({'returnval': rows});

   }
   else
     res.status(200).json({'returnval': "Invalid!"});
 });
});
// **flag 1 quality-parameter-range-type-value-service22222 ******
// var qualityrangevalueservicepath=require("./app/elements/quality-parameter-range-value-service/qualityrangevalueservicedb.js");
app.post('/qualityrangevalueservice1', urlencodedParser, function (req, res) {
connectdb.qualityrangevalueservice1(req.query.itemid_get,req.query.qualityid_get,req.query.flagvalue,function(rows){
// console.log(req.query.minimumvalue);
   if(rows!="reject"){
     res.status(200).json({'returnval': rows});

   }
   else
     res.status(200).json({'returnval': "Invalid!"});
 });
});
// **flag 2 quality-parameter-range-type-value-service22222 ******
// var qualityrangevalueservicepath=require("./app/elements/quality-parameter-range-value-service/qualityrangevalueservicedb.js");
app.post('/qualityrangevalueservice2', urlencodedParser, function (req, res) {
connectdb.qualityrangevalueservice2(req.query.itemid_get,req.query.qualityid_get,req.query.flagvalue,function(rows){
// console.log(req.query.minimumvalue);
   if(rows!="reject"){
     res.status(200).json({'returnval': rows});
   }
   else
     res.status(200).json({'returnval': "Invalid!"});
 });
});


// var testingdatapath=require("./app/elements/item-quality-testing/itemqualitytestingdb.js");
app.post ('/testingdata', urlencodedParser, function (req, res) {
  console.log(req.query.grnnumber);
 connectdb.testingdata(req.query.grnnumber,function(rows){
   if(rows!=="reject")
     res.status(200).json({'returnval': rows});
   else
     res.status(200).json({'returnval': "No testingdata!"});
 });
});
// var qualityparameteridfetchservicepath=require("./app/elements/quality-parameter-id-itemid-mapping-service/qualityparameteridfetchservicedb.js");
app.post('/qualityparameteridfetchservice', urlencodedParser, function (req, res) {
connectdb.qualityparameteridfetchservice(req.query.qualityid_get,function(rows){
    if(rows!="reject"){
      // console.log(rows);
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

app.listen(4000);
