/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout','promise','jquery', 'ojs/ojslider', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata','ojs/ojtable'], function (oj, ko, $) {
    'use strict';
    
    function ExampleComponentModel(context) {
        var self = this;
        //var dataRow = {};
        /** for edit 
        {
        	"Name_Surname":"Nathaphon Kiatwonghong",
        	"Job_Type":"Documentation",
        	"Job_SOW":"BoM",
        	"Base_Technology":["Cloud","Network","Security"],
        	"UID":3,
        	"Job_Header":"BOM WSS",
        	"Job_detail":"",
        	"create_date":"2017-10-27T06:20:21.290Z",
        	"Job_date":"2017-10-04T00:00:00.000Z",
        	"modify_date":"2017-10-27T06:30:13.903Z",
        	"Job_Hours":4,"Job_progress":100,
        	"contract":["[Cambodia] TrustGroup"],
        	"Job_status":"On Progress",
        	"remark":["0"],
        	"Brands":["Bluecoat"],"id":35
        }
        
        */
        //****************	
        //self.data=ko.observable();
        self.composite = context.element;
        //self.dataRow=ko.observable()
        //Example observable
        self.sowlist= ko.observableArray();
        
         
        

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;
            self.myid= self.properties.dataRow.id;
            self.data= self.properties.dataRow;
            var xdate= new Date(self.properties.dataRow.Job_date);
            //var ndate = new Date(2017, 4, 10)
            self.nsow=ko.observable(self.properties.dataRow.Job_SOW);
            self.jobdate =ko.observable(oj.IntlConverterUtils.dateToLocalIso(xdate));
            self.sli= ko.observable(self.properties.dataRow.Job_progress);
            self.sowlist = self.properties.dataRow.sowlist
            self.job_hours= ko.observable(self.properties.dataRow.Job_Hours);
            //Parse your component properties here 
        });
        

        
    	
        
        self.editButton = function() {

        	document.querySelector('#EditDialog'+this.myid).open();
		};
		self.comboChange = function( event )
		{
			var selested =self.sowlist.filter(sow => sow.Name==event.detail.value)
			self.job_hours = ko.observable(selested[0].Hours)
			var a=1;
		};
		
        self.saveButton = function() {
        	var url = "/api/timesheets/"+this.myid;
        	// data reload
        	this.data.modify_date= Date.now();
        	this.data.Job_SOW = self.nsow._latestValue
        	this.data.Job_progress = self.sli._latestValue
        	this.data.Job_date = new Date(self.jobdate._latestValue)
        	this.data.Job_Hours = self.job_hours._latestValue
        	
        	
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

    return ExampleComponentModel;
});