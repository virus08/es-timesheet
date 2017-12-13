/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojdialog','ojs/ojslider'], function (oj, ko, $) {
    'use strict';
    
    function ExampleComponentModel(context) {
        var self = this;
        //var j = new jquery;
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
        
        var uname = getapi("http://localhost:8080/api/profiles").filter(uid => uid.uid == window.GlobalVariable)[0];
        self.slist = getapi("http://localhost:8080/api/sows")
        self.typelist= getapi("http://localhost:8080/api/jobtypes");
        self.techlist= getapi("http://localhost:8080/api/teches");
        self.brandslist= getapi("http://localhost:8080/api/brands");
        self.projectlist= getapi("http://localhost:8080/api/projects").
        	filter(tlist=> tlist.UID == window.GlobalVariable).
        	filter(tlist=> tlist.status != "Cancel").
        	filter(tlist=> tlist.status != "Close");
        self.sowlist= ko.observableArray([]);
        //self.clist= ko.observableArray([]);
        self.composite = context.element;
        //Example observable
        //self.messageText = ko.observable('Hello from Example Component');
        
        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;
            self.newdata = ko.observable()
            self.newdata.Name_Surname= uname.Name+' '+uname.Sname;           
            //self.newdata.Job_Type='';        
            //self.newdata.Job_SOW = '';

        });
        
        var vm;
        self.test = function(contex){
        	var data = self.slist.filter(list => list.GroupName==contex.detail.value)
        	var len = self.sowlist._latestValue.length;
			var i;
			for (i = 0; i < len ; i++) {self.sowlist.pop();}
        	var len = data.length
        	var i;
			for (i = 0; i < len ; i++) {
				self.sowlist.push({
					value:data[i].Name,
					label:data[i].Name+' ('+data[i].Hours+')'
				});
				
				}
        	data = null;
        }
        
    };
    self.addedClick = function(contex){
    	var url = "/api/timesheets"
    	var now= new Date();
    	var jdate= new Date(contex.newdata.Job_date);
    	var jhours= contex.slist.filter(list=> list.Name == contex.newdata.Job_SOW[0])[0].Hours
    	var xhr = new XMLHttpRequest();
    	xhr.open("POST", url, true);
    	xhr.setRequestHeader('Content-type','application/json');
    	xhr.setRequestHeader('Accept','application/json');
    	xhr.onload = function () {
    		var res = JSON.parse(xhr.responseText);
    		if (xhr.readyState == 4 && xhr.status == "200") {
    			console.table(res);
    		} else {
    			console.error(res);
    		}
    	}
    	var data= {
        		"Name_Surname":contex.newdata.Name_Surname,
        		"Job_Type":contex.newdata.Job_Type,
        		"Job_SOW":contex.newdata.Job_SOW[0],
        		"Base_Technology":contex.newdata.Base_Technology,
        		"UID":window.GlobalVariable,
        		"Job_Header":contex.newdata.Job_Header,
        		"Job_detail":contex.newdata.Job_detail,
        		"create_date":now,
        		"Job_date":jdate,
        		"modify_date":now,
        		"Job_Hours":jhours,
        		"Job_progress":contex.newdata.sli,
        		"contract":contex.newdata.contact,
        		"Job_status":contex.newdata.Job_status,
        		"remark":contex.newdata.remark,
        		"Brands":contex.newdata.Brands,
        	} ;
    	var json = JSON.stringify(data);
    	xhr.send(json);
    	document.querySelector('#AddNewTask').close();
    	window.location.reload();
    }
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.attached = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    return ExampleComponentModel;
});