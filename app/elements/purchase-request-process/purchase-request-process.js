var autoid;
var iid;
var item1;
var autoc_item_name="";
var autoc_item_id="";
var itemtypeid;
var containerid;
var warehouselocation;
Polymer({
  is: "purchase-request-process",
  searchWHLocation:function(){
    document.querySelector("purchase-request-process-ironajax").searchlocation(this.itemname);
  },
  purchase_requestlabel:function(purchase_requestlabel){
    this.typelabel=purchase_requestlabel[0].itemtype;
    this.namelabel=purchase_requestlabel[0].itemname;
    this.spec1label=purchase_requestlabel[0].itemspecification1;
    this.whloclabel=purchase_requestlabel[0].warehouselocation;
    this.containerlabel=purchase_requestlabel[0].itemcontainer;
    this.containerquantitylabel=purchase_requestlabel[0].itemcontainerquantity;
    this.itemquantitylabel=purchase_requestlabel[0].itemquantity;
  },
  savepurchase_request:function(){
    var json={};
    json.purchase_requestid=autoid;
    json.iid=iid;
    json.selectedtype=itemtypeid;
    json.supplier_name=this.value2;
    json.itemspec1=this.itemspec1;
    json.whlocation=warehouselocation;
    json.selectedcontainer=containerid;
    json.itemcontainerquantity=this.itemcontainerquantity;
    json.itemquantity=this.itemquantity;
    json.purchase_requestdate=this.purchase_requestdate;
    json.requireddate=this.min;
    document.querySelector('purchase-request-process-ironajax').savedata(json);
  },
  searchitem:function(){
    document.querySelector('purchase-request-process-ironajax').searchitem(this.value1);
  },
  itemdata:function(e){
    itemtypeid=e[0].item_type_id;
    containerid=e[0].container_id;
    warehouselocation=e[0].warehouse_stores_id;
    item1=e;
    iid=e[0].item_id;
    this.itype=e[0].item_type_name;
    this.itemspec1=e[0].item_specification1;
    this.whlocation=e[0].warehouse_stores_name;
    this.icontainer=e[0].container_name;
  },
  checkid:function(x){
    autoid=x;
  },
  //autocomplete***********
  FnSearchEnquiry1:function(e){
    item1=this.tempitemname1;
      if(e.keyCode==13|| e.keyCode==40)
      this.querySelector('#transportinput3').focus();
      var arr=[];
      if(e.keyCode==8){
        this.itemflag1="true";
        this.itemval1="";
        var len=(this.value1).length;
        if(len<=1){
          this.querySelector('#transportinput3').style.visibility='hidden';
          this.itemArray1="";
          this.itemval1="";
        }
        if(len>1){
          this.querySelector('#transportinput3').style.visibility='visible';
          var backsubval=(((this.value1).substring(0,(len-1))).trim()).toUpperCase();
          for(var i=0;i<item1.length;i++)
          {
            var subval=((item1[i].item_name).trim()).substring(0,backsubval.length);
            if((item1[i].item_name).toUpperCase().indexOf((this.value1).toUpperCase())!=-1)
            {
              var obj1={"itemdes1":"","enquiry_no":""};
              obj1.itemdes1=item1[i].item_name;
              obj1.item_id=item1[i].item_id;
              arr.push(obj1);
            }
          }
          this.itemArray1=arr;
        }
      }
      if(e.keyCode!=8&& e.keyCode!=16&& e.keyCode!=13 && e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=37&&e.keyCode!=39){
        if(this.itemflag1=="true") {
          this.itemval1 = (this.value1).toUpperCase()+String.fromCharCode((e.keyCode)).toUpperCase();
          this.itemflag1="false";
        }
        else
        this.itemval1 = this.value1 +String.fromCharCode((e.keyCode));
        if(this.itemval1.length>0)
        {
          for(var i=0;i<item1.length;i++)
          {
            var subval=((item1[i].item_name).trim()).substring(0,this.itemval1.length);
            if((item1[i].item_name).toUpperCase().indexOf((this.itemval1).toUpperCase())!=-1)
            {
              var obj1={"itemdes1":"","enquiry_no":""};
              obj1.itemdes1=item1[i].item_name;
              obj1.item_id=item1[i].item_id;
              arr.push(obj1);
            }
          }
          if(arr.length>0)
            this.itemArray1=arr;
          else
          {
            var obj1={"itemdes1":"","enquiry_no":""};
            obj.itemdes1="No items found";
            arr.push(obj1);
            this.itemArray1=arr;
          }
        }
      }
      },
      FnSelectEnquiry2:function(e){
      this.querySelector('#transportinput3').style.visibility='hidden';
      autoc_item_name = e.target.selectedItem.textContent.trim();
      autoc_item_id = e.target.selectedItem.value.trim();
      this.itemArray1=[];
      document.querySelector('#transportinput3').selected=-1;
      this.value1=autoc_item_name;
    },
    FnSearchEnquiry2:function(e){
      item1=this.tempitemname1;
        if(e.keyCode==13|| e.keyCode==40)
        this.querySelector('#transportinput4').focus();
        var arr=[];
        if(e.keyCode==8){
          this.itemflag1="true";
          this.itemval1="";
          var len=(this.value2).length;
          if(len<=1){
            this.querySelector('#transportinput4').style.visibility='hidden';
            this.supplierArray="";
            this.itemval1="";
          }
          if(len>1){
            this.querySelector('#transportinput4').style.visibility='visible';
            var backsubval=(((this.value2).substring(0,(len-1))).trim()).toUpperCase();
            for(var i=0;i<item1.length;i++)
            {
              var subval=((item1[i].supplier_name).trim()).substring(0,backsubval.length);
              if((item1[i].supplier_name).toUpperCase().indexOf((this.value2).toUpperCase())!=-1)
              {
                var obj1={"itemdes1":"","enquiry_no":""};
                obj1.itemdes1=item1[i].supplier_name;
                obj1.item_id=item1[i].item_id;
                arr.push(obj1);
              }
            }
            this.supplierArray=arr;
          }
        }
        if(e.keyCode!=8&& e.keyCode!=16&& e.keyCode!=13 && e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=37&&e.keyCode!=39){
          if(this.itemflag1=="true") {
            this.itemval1 = (this.value2).toUpperCase()+String.fromCharCode((e.keyCode)).toUpperCase();
            this.itemflag1="false";
          }
          else
          this.itemval1 = this.value2 +String.fromCharCode((e.keyCode));
          if(this.itemval1.length>0)
          {
            for(var i=0;i<item1.length;i++)
            {
              var subval=((item1[i].supplier_name).trim()).substring(0,this.itemval1.length);
              if((item1[i].supplier_name).toUpperCase().indexOf((this.itemval1).toUpperCase())!=-1)
              {
                var obj1={"itemdes1":"","enquiry_no":""};
                obj1.itemdes1=item1[i].supplier_name;
                obj1.item_id=item1[i].item_id;
                arr.push(obj1);
              }
            }
            if(arr.length>0)
              this.supplierArray=arr;
            else
            {
              var obj1={"itemdes1":"","enquiry_no":""};
              obj.itemdes1="No items found";
              arr.push(obj1);
              this.supplierArray=arr;
            }
          }
        }
        },
        FnSelectEnquiry3:function(e){
        this.querySelector('#transportinput4').style.visibility='hidden';
        autoc_supplier_name = e.target.selectedItem.textContent.trim();
        autoc_item_id = e.target.selectedItem.value.trim();
        this.supplierArray=[];
        document.querySelector('#transportinput4').selected=-1;
        this.value2=autoc_supplier_name;
      },
  //autocomplete***********End
});
