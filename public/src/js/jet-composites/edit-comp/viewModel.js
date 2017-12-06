/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout','promise', 'jquery'], function (oj, ko, $) {
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
        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;
            self.myid= self.properties.dataRow.id
            self.data= self.properties.dataRow
            //Parse your component properties here 
        });
        self.editButton = function() {
        	document.querySelector('#EditDialog'+this.myid).open();
		}
        
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