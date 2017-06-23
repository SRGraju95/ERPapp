(function() {
   'use strict';
    var vehnoarr=[];
 Polymer({
  is:"call-security-card-ironajax",
    ready:function(){
      alert("call-security-card-ironajax");
    },
    savesecurityFn:function(data){
        this.securityjsonparams=data;
        this.$.securityAjax.generateRequest();
    },
    securityhandleResponse:function(e){
        alert(e.detail.response.returnval);
    },
    searchidFn:function(data){
        this.securitysearchparams=data;
        this.$.securitysearchAjax.generateRequest();
    },
    securitysearchResponse:function(e){
      // alert("calling");
      // alert(JSON.stringify(e.detail.response.returnval));
        var salesdata=e.detail.response.returnval;
        document.querySelector("call-security-card").bindsaleoredercard(salesdata);
      //   alert(JSON.stringify(salesdata));
      //   if(salesdata!="does not get vehicel no"){
      //   if(salesdata.length>0){
      //   for(var i=0;i<salesdata.length;i++){
      //   var obj={salid:salesdata[i].salesorderid};
      //   this.loopsecuritysearchparams=obj;
      //   this.$.loopsecuritysearchAjax.generateRequest();
      //     }
      //   }
      //   else{
      //     document.querySelector("call-security-card").securityresponseFn(salesdata);
      //   }
      // }
      // else {
      //
      //   }
    },
    loopsecuritysearchResponse:function(e){
      var data=e.detail.response.returnval;
      for(var i=0;i<data.length;i++){
      document.querySelector("call-security-card").securityresponseFn1(data[i]);
     }
    },
    autosecuritysearchResponse:function(e){
      var arr=e.detail.response.returnval;
      // for(var i=0;i<=arr.length;i++){
      // if(arr[i].state="in"){
      // vehnoarr.push(arr[i]);
      // document.querySelector("call-security-card").getvehnoFn(vehnoarr);
      // }
      if(arr.length>0){
        document.querySelector("call-security-card").getvehnoFn(arr);
      }
      else {
          alert("no number of vehicle In state");
      }
    // }
  }
});
})();
