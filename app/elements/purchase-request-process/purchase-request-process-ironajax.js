Polymer({
  is: "purchase-request-process-ironajax",
  searchitem:function(e){
    var json={};
    json.itemname=e;
    this.searchitemparam=json;
    this.$.searchitem.generateRequest();
  },
  handlepurchase_requestsave:function(e){
    alert(e.detail.response.status)
  },
  handlepurchase_requestlabel:function(){
    document.querySelector("purchase-request-process").purchase_requestlabel(this.purchase_requestlabel);
  },
  handleItems:function(e){
    document.querySelector("purchase-request-process").itemdata(e.detail.response.itemdetails);
  },
  savedata:function(data){
    this.purchase_requestparam=data;
    this.$.purchase_requestia.generateRequest();
  },
  handlepurchase_requestitems:function(e){
    document.querySelector('purchase-request-process').itemnames=e.detail.response.itemnames;
    document.querySelector('purchase-request-process').tempitemname1=e.detail.response.itemnames;
  }
});
