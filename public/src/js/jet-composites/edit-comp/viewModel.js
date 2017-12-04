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
        self.data = ko.observableArray();
        $.getJSON("http://localhost:8080/api/timesheets").then(
				function(timesheet) {
					$.each(timesheet, function() {
						if (this.UID == self.userid) {
							this.Job_date = new moment(this.Job_date)
									.format('Do, MMMM YYYY');
							self.data.push(this);
						}
					});
				});
		
		self.datasource = new oj.ArrayTableDataSource(self.data, {
			idAttribute : 'Job_Header'
		});
		self.pagingDatasource = new oj.PagingTableDataSource(self.datasource);

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