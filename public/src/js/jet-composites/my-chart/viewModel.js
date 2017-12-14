/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart'], function (oj, ko, $) {
    'use strict';
 

	
    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;
        //Example observable
        self.messageText = ko.observable('Hello from Example Component');
        //self.chartType = "bar";
        /*self.value = [{name: "Open", items: [1,2,3,4,5,6,7,8,9,10,11,12]},
            {name: "On Progress", items: [1,2,3,4,5,6,7,8,9,10,11,12]},
            {name: "Completed", items: [1,2,3,4,5,6,7,8,9,10,11,12]},
            {name: "Cancel", items: [1,2,3,4,5,6,7,8,9,10,11,12]}];
        */

        //self.group = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;
            //self.messageText(self.properties.myMessage);
            self.chartType = self.properties.chartType;
    		self.barSeriesValue = ko.observableArray(self.properties.value);
    		self.barGroupsValue = ko.observableArray(self.properties.group);

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