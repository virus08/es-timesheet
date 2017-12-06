/**
 * Copyright (c) 2015, 2017, Oracle and/or its affiliates. The Universal
 * Permissive License (UPL), Version 1.0
 */
define([ 'ojs/ojcore', 'knockout', 'jquery','promise', 'ojs/ojknockout', 'ojs/ojtable',
		'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource',
		'ojs/ojarraytabledatasource','ojs/ojoffcanvas', 'ojs/ojbutton',
		'ojs/ojselectcombobox','ojs/ojlabel'],
	function(oj, ko, $) {
	'use strict';

	function ExampleComponentModel(context) {
		var self = this;
		self.composite = context.element;
		self.userid = window.GlobalVariable;
		self.headertext = ko.observable('This Table Header');
		self.data = ko.observableArray();
		self.columntable = [ 
			{"headerText" : "Job name","field" : "Job_Header"}, 
			{"headerText" : "Job type","field" : "Job_Type"},
			{"headerText" : "Deadline","field" : "Job_date"}, 
			{"headerText" : "Status","field" : "Job_status"}] 
		
		self.status = ko.observableArray(["Open","On Progress"]);
		context.props.then(function(propertyMap) {
			self.properties = propertyMap;
			self.headertext(self.properties.myMessage);
			self.columntable=self.properties.columnArray;
		});
		
		
		this.innerDrawer =
	      {
	        "displayMode": "push",
	        "selector": "#iDrawer",
	        "content": "#iMain"
	      };
		this.toggleInner = function()
	      {
	        return oj.OffcanvasUtils.toggle(self.innerDrawer);
	      };
	    this.closeInner = function()
	      {
	        return oj.OffcanvasUtils.close(self.innerDrawer);
	      };

		self.statusChanged = function(event) {
			var filter = event.target.value;
			var len = self.data._latestValue.length;
			var i;
			for (i = 0; i < len ; i++) {self.data.pop();}
			$.getJSON("http://localhost:8080/api/timesheets").then(
				function(timesheet) {
					$.each(timesheet, function() {
						if (this.UID == self.userid) {
							if (this.Job_status==filter[0] ||this.Job_status== filter[1]||this.Job_status==filter[2] ||this.Job_status== filter[3]){
								this.Job_date = new moment(this.Job_date).format('Do, MMMM YYYY');
									self.data.push(this);
								}
							}
						});
				});	
		};
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
			self.pagingDatasource = new oj.PagingTableDataSource(
				new oj.ArrayTableDataSource(self.data, {
					idAttribute : 'Job_Header'
				}));
			};
	return ExampleComponentModel;
});