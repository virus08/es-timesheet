/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery'], function (oj, ko, $) {
    'use strict';
    
    function ExampleComponentModel(context) {
        var self = this;
        
        self.composite = context.element;
        //Example observable
        //self.messageText = ko.observable('Hello from Example Component');

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;
            self.newdata = ko.observable();
            //Parse your component properties here 

        });
        //Event Handling 
        self.addedProjectClick = function (contex){
        	var url ="http://localhost:8080/api/projects"
        	var now = new Date();
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
        	var data = {
        			"Name": this.newdata.Name,
        			"Status":this.newdata.Status,
        			"Desc": this.newdata.Desc,
        			"Type": this.newdata.Type,
        			"UID": window.GlobalVariable,
        			"Create_date": now
        	}
        	var json = JSON.stringify(data);
        	xhr.send(json);
        	document.querySelector('#AddProject').close();
        	
        	window.location.reload();
        };
        
        self.addedNewProjectClick = function (contex){
        	//alert('Test')
        	
        	document.querySelector('#AddProject').open();
        	//window.location.reload();
        };
        self.TypeChange = function (contex) {
        	
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