var mysql=require('mysql');

exports.searchitem=function(role,callback){
  connection.query("select distinct T1.item_name from test.md_procurement_item_detail as T1 JOIN test.md_procurement_purchase_request_itemtype_department_mapping as T2 on T1.item_type_id = T2.item_type_id and T1.item_status='active' JOIN test.md_hr_department_detail as T3 on T3.department_id=T2.purchase_request_reviewer_department JOIN test.od_hr_employee_role as T4 on T4.role=T3.department_name where T4.role='"+role+"';",function(err,itemnames){
    if(itemnames.length>0){
      return callback(itemnames);
    }
    else {
      return callback("No items found!");
    }
  })
}

exports.getpurchase_requestitem=function(itemname,callback){
  connection.query("select * from md_procurement_item_detail where item_name='"+itemname+"'",function(err,itemdetails){
    if(itemdetails.length>0){
      return callback(itemdetails);
    }
    else {
      return callback("No Data!");
    }
  })
}

exports.getwarehouselocation=function(itemname,callback){
  var id;
    connection.query("select itemid from m_item_details where itemname='"+itemname+"'",function(err,itemid){
      if(itemid.length>0){
        global.id=itemid[0].itemid;
        connection.query("select * from m_item_details where itemid='"+global.id+"'",function(err,warehouselocation){
          return callback(warehouselocation);
        })
      }
      else{
        connection.query("select itemid from finishedgoods_itemtype where itemname='"+itemname+"'",function(err,itemid){
          global.id=itemid[0].itemid;
          connection.query("select * from finishedgoods_itemtype where itemid='"+global.id+"'",function(err,warehouselocation){
            return callback(warehouselocation);
          })
        })
      }
    });
}

exports.savepurchase_request=function(purchase_requestid,iid,selectedtype,itemspec1,whlocation,selectedcontainer,itemcontainerquantity,itemquantity,purchase_requestdate,requireddate,callback){
  var data={
    "purchase_request_number":purchase_requestid,
    "purchase_request_date":purchase_requestdate,
    "purchase_request_type_id":selectedtype,
    "item_id":iid,
    "item_quantity":itemquantity,
    "container_quantity":itemcontainerquantity,
    "warehouse_stores_id":whlocation,
    "status":"Created",
    "item_required_date":requireddate
  }
  connection.query("insert into od_procurement_purchase_request_register set ?",[data],function(err,rows){
    if(rows.affectedRows>0){
      return callback("Saved");
    }
    else {
      return callback("Not Saved!");
    }
  })
}
