/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout','promise','jquery', 'ojs/ojslider', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata','ojs/ojtable'], function (oj, ko, $) {
    'use strict';
    
    function ExampleComponentModel(context) {
        var self = this;
        
        //****************	
        //self.data=ko.observable();
        self.composite = context.element;
        //self.dataRow=ko.observable()
        //Example observable
        self.sowlist= ko.observableArray();
        
         
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

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;
            self.myid= self.properties.dataRow.id;
            self.data= self.properties.dataRow;
            var xdate= new Date(self.properties.dataRow.Job_date);
            self.nsow=ko.observable(self.properties.dataRow.Job_SOW);
            self.jobdate =ko.observable(oj.IntlConverterUtils.dateToLocalIso(xdate));
            self.sli= ko.observable(self.properties.dataRow.Job_progress);
            self.sowlist = self.properties.dataRow.sowlist
            self.job_hours= ko.observable(self.properties.dataRow.Job_Hours);
            self.projectlist= getapi("/api/projects").
        	filter(tlist=> tlist.UID == window.GlobalVariable).
        	filter(tlist=> tlist.status != "Cancel").
        	filter(tlist=> tlist.status != "Close");
        });
        

        
    	
        
        self.editButton = function() {

        	document.querySelector('#EditDialog'+this.myid).open();
		};
		self.comboChange = function( event )
		{
			var selested = self.sowlist.filter(sow => sow.Name==event.detail.value);
			self.job_hours = ko.observable(selested[0].Hours);
		};
		
        self.saveButton = function() {
        	var url = "/api/timesheets/"+this.myid;
        	// data reload
        	this.data.modify_date= new Date();
        	this.data.Job_SOW = self.nsow._latestValue
        	this.data.Job_progress = self.sli._latestValue
        	this.data.Job_date = new Date(self.jobdate._latestValue)
        	this.data.Job_Hours = self.job_hours._latestValue
        	this.data.newJob_date=null;
        	this.data.sowlist=null;
        	
        	var json = JSON.stringify(this.data);

        	var xhr = new XMLHttpRequest();
        	xhr.open("PUT", url, true);
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
        	xhr.send(json);
        	document.querySelector('#EditDialog'+this.myid).close();
        	window.location.reload();
		};
        
        self.clickdelete = function(){
        	var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('DELETE', '/api/timesheets/'+this.myid,true);
			xmlhttp.setRequestHeader('Content-Type', 'application/json');
			xmlhttp.onload = function () {
				var xdata = JSON.parse(xmlhttp.responseText);
				if (xmlhttp.readyState == 4 && xmlhttp.status == '200') {
					console.table(xdata);
					//console.log('/api/timesheets/'+id)
					//console.log(JSON.parse($parent.this))
					} else {
							console.error(xdata);
					}}
				if (confirm('Delete Thisjob on:'+this.myid) == true) {
					xmlhttp.send();
					document.querySelector('#EditDialog'+this.myid).close();
					}
        	window.location.reload();

        }

    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.attached = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    //ko.applyBindings(this);
    return ExampleComponentModel;
    
});

