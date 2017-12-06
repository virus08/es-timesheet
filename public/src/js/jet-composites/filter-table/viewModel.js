/**
 * Copyright (c) 2015, 2017, Oracle and/or its affiliates. The Universal
 * Permissive License (UPL), Version 1.0
 */
define([ 'ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojtable',
		'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource',
		'ojs/ojarraytabledatasource','ojs/ojdatetimepicker','ojs/ojslider',
        'ojs/ojselectcombobox', 'ojs/ojtimezonedata', 'ojs/ojlabel',
        'ojs/ojbutton', 'ojs/ojdialog','ojs/ojinputtext', 'ojs/ojcheckboxset',
        'ojs/ojformlayout'], function(oj, ko, $) {
	'use strict';

	function tabletimesheet(context) {
		var self = this;
		self.composite = context.element;
		self.userid = window.GlobalVariable;
	    
		self.status = ko.observableArray(["Open","On Progress"]);
		var selected = $( ".selector" ).ojTable("option", "selection");
		context.props.then(function(propertyMap) {
			self.properties = propertyMap;
		});
		self.oracle_link_hdr_func = function(context) 
	    {
	      return {'insert':'Action'};
	    };
	    
	    self.oracle_link_func = function(context) 
	    {
	    	var xdiv = $(document.createElement('div'));
	    	xdiv.attr("id", "buttonOpener");
	        xdiv.append('<button onclick="document.querySelector('+'\'#EditDialog'+context.row.id+'\').open();">Edit</button>');
	        $(context.cellContext.parentElement).append(xdiv);
	    };
	    self.deleteitem = function(id){
	    	var filter = self.status._latestValue;
	    	var len = self.data._latestValue.length;
			var i;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('DELETE', '/api/timesheets/'+id,true);
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
				if (confirm('Delete Thisjob on:'+id) == true) {
					document.querySelector('#EditDialog'+id).close();
					xmlhttp.send();
					}
			for (i = 0; i < len ; i++) { 
				self.data.pop();
			}
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
	    }
	    
		self.statusChanged = function(event) {
			var filter = event.target.value;
			var len = self.data._latestValue.length;
			var i;
			for (i = 0; i < len ; i++) { 
				self.data.pop();
			}

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
		
		self.data = ko.observableArray();
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
		},{"headerRenderer": self.oracle_link_hdr_func, 
            "renderer": self.oracle_link_func
        }
		];
		

	    
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
		
	};
	

	return tabletimesheet;
});