/**
 * Copyright (c) 2015, 2017, Oracle and/or its affiliates. The Universal
 * Permissive License (UPL), Version 1.0
 */
define([ 'ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable',
		'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource',
		'ojs/ojarraytabledatasource' ], function(oj, ko, $) {
	'use strict';

	function ExampleComponentModel(context) {
		var self = this;
		self.composite = context.element;
		self.userid = window.GlobalVariable;
		context.props.then(function(propertyMap) {
			self.properties = propertyMap;
		});
		self.data = ko.observableArray();
		self.data1 = ko.observableArray();
		self.columnArray = [ {
			"headerText" : "Job name",
			"field" : "Job_Header"
		}, {
			"headerText" : "Job type",
			"field" : "Job_Type"
		}, {
			"headerText" : "Deadline",
			"field" : "Job_date"
		}, {
			"headerText" : "Status",
			"field" : "Job_status"
		}, {
			"headerTemplate" : "oracle_link_hdr",
			"template" : "oracle_link"
		} ]
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
	}
	;

	return ExampleComponentModel;
});