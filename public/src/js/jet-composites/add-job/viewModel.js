/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojdialog'], function (oj, ko, $) {
    'use strict';
    
    function ExampleComponentModel(context) {
        var self = this;
        
        /* var self.data= {
        		"Name_Surname":"Nathaphon Kiatwonghong",
        		"Job_Type":"Sales Support",
        		"Job_SOW":"Solution Consultant",
        		"Base_Technology":[
        			"Network",
        			"Security"
        			],"UID":3,
        		"Job_Header":"Support WSS Manual",
        		"Job_detail":"",
        		"create_date":"2017-10-27T06:25:58.010Z",
        		"Job_date":"2017-10-04T00:00:00.000Z",
        		"modify_date":"2017-10-27T06:31:33.870Z",
        		"Job_Hours":1,
        		"Job_progress":100,
        		"contract":["Phatara/Newly Wet"],
        		"Job_status":"On Progress",
        		"remark":["0"],
        		"Brands":["Bluecoat"],
        		"id":39
        	} */
        self.composite = context.element;
        //Example observable
        //self.messageText = ko.observable('Hello from Example Component');
        
        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;

            //Parse your component properties here 

        });
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