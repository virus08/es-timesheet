/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery','jet-composites/my-chart/loader'],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
      var self = this;
      
      var getapi= function (url){
      	  var xhr = new XMLHttpRequest();
      	  var res;
            xhr.open("GET", url, false);
            //xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.onload = function() {
      		res = JSON.parse(xhr.responseText);
      		if (xhr.readyState == 4 && xhr.status == "200") {
      			return res;
      		} else {
      			console.error(res);
      			return res;
      		}
      	  }
            xhr.send();  
            return res;
        }
      
      self.timesheet=getapi("/api/timesheets").filter(
    		  list => list.UID == window.GlobalVariable
      );
      //object.filter().length 
      self.value1 =  [{name: "Open", items: [self.timesheet.filter(list => list.Job_status=="Open").length]},
          {name: "On Progress", items: [self.timesheet.filter(list => list.Job_status=="On Progress").length]},
          {name: "Completed", items: [self.timesheet.filter(list => list.Job_status=="Completed").length]},
          {name: "Cancel", items: [self.timesheet.filter(list => list.Job_status=="Cancel").length]}];
      
      self.group1 = [];
      var getm = function(list,comp){
    	  res =null;
    	  var mo= new Date(list.create_date);
    	  var a = mo.getMonth();
    	  if (a==comp){
    		  res=list;
    	  }
    	  return res
      };
      
      //var count1= self.timesheet.filter(list => getm(list,9)).length;
      var a = self.timesheet.filter(list => getm(list,1)).length;
      var b = self.timesheet.filter(list => getm(list,2)).length;
      var c = self.timesheet.filter(list => getm(list,3)).length;
      var d = self.timesheet.filter(list => getm(list,4)).length;
      var e = self.timesheet.filter(list => getm(list,5)).length;
      var f = self.timesheet.filter(list => getm(list,6)).length;
      var g = self.timesheet.filter(list => getm(list,7)).length;
      var h = self.timesheet.filter(list => getm(list,8)).length;
      var i = self.timesheet.filter(list => getm(list,9)).length;
      var j = self.timesheet.filter(list => getm(list,10)).length;
      var k = self.timesheet.filter(list => getm(list,11)).length;
      var l = self.timesheet.filter(list => getm(list,12)).length;
      
      self.value2 =  [{name: "Count", items: [a,b,c,d,e,f,g,h,i,j,k,l]}];
      
      
      self.group2 =  ["January","February","March","April","May","June","July","August","September","October","November","December"];
      
      self.handleActivated = function(info) {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
