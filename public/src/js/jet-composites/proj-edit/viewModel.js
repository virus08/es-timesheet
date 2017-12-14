/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery','ojs/ojdialog','ojs/ojbutton'], function (oj, ko, $) {
    'use strict';
    
    function ExampleComponentModel(context) {
        var self = this;
        //self.id=1;
        self.composite = context.element;
        //Example observable
        //self.messageText = ko.observable('Hello from Example Component');

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;
            self.data=self.properties.data;
            self.Name= ko.observable(self.properties.data.Name)
            self.Desc= ko.observable(self.properties.data.Desc)
            self.Type= ko.observable(self.properties.data.Type)
            self.Status= ko.observable(self.properties.data.Status)
            //self.row=ko.observable(self.properties.data);
            self.id=self.properties.data.id;
            //Parse your component properties here 

        });
        self.editClick = function(even){
        	document.querySelector('#Edit'+even.id).open();
        };
        self.okClick = function(even){
        	var url="/api/projects/"+even.id
        	var xhr = new XMLHttpRequest();
        	var now = new Date();
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
        	var data =  {
        		    "Name": even.Name._latestValue,
        		    "id": even.id,
        		    "Status": even.Status._latestValue,
        		    "Desc": even.Desc._latestValue,
        		    "Type": even.Type._latestValue,
        		    "UID": window.GlobalVariable,
        		    "Modify_date": now,
        		    "Create_date": even.data.Create_date
        		  };
        	var json = JSON.stringify(data);
        	xhr.send(json);
        	document.querySelector('#Edit'+even.id).close();
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