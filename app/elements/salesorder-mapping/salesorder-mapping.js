var saleidarr=[];
Polymer({
  is:"salesorder-mapping",
      ready:function(){
        alert("salesorder-mapping");
      },
      getsalesorderFn:function(data,vehno,salid){
        document.querySelector("salesorder-mapping").getvehicleno=vehno;
        this.saleorderdata=data;
      },
      salesappendFn:function(data){
            saleidarr=data;
            var maparr=[];
            for(var i=0;i<saleidarr.length;i++)
            {
              var obj={vehno:this.getvehicleno,
                        salid:saleidarr[i]};
                        maparr.push(obj);
            }
           document.querySelector("salesorder-papercard").arrnullFn();
           document.querySelector("salesorder-mapping-ironajax").getsavebtnFn(maparr);
           document.querySelector("home-page").FnSetPage("vehicleorder-summary");
      },
      saveselectesalesidFn:function(){
        document.querySelector("salesorder-papercard").get_selected_salesid_fn();
      }
      // backto_vehsummary:function(){
      //   document.querySelector("home-page").FnSetPage("vehicleorder-summary");
      // }
});
