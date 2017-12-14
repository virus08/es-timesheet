/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise','ojs/ojbutton', 'ojs/ojdialog','jet-composites/proj-edit/loader',
        'ojs/ojtable', 'ojs/ojrowexpander', 'ojs/ojflattenedtreetabledatasource', 'ojs/ojjsontreedatasource'], function (oj, ko, $) {
    'use strict';
    
    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;
        //Example observable
        //self.messageText = ko.observable('Hello from Example Component');
        self.datasource = ko.observable();
        var getapi= function (url){
        	  var xhr = new XMLHttpRequest();
        	  var res;
              xhr.open("GET", url, false);
              //xhr.setRequestHeader('Content-type', 'application/json');
              xhr.setRequestHeader('Accept', 'application/json');
              xhr.onload = function() {
        		res = JSON.parse(xhr.responseText);
        		if (xhr.readyState == 4 && xhr.status == "200") {
        			return res;
        		} else {
        			console.error(res);
        			return res;
        		}
        	  }
              xhr.send();  
              return res;
          }
        self.projectlist= getapi("/api/projects").filter(tlist=> tlist.UID == window.GlobalVariable).filter(tlist=> tlist.status != "Cancel");
        self.Timesheet= getapi("/api/timesheets")
        var len = self.projectlist.length;
        var i;
        var data=[];
        for(i=0;i<len;i++){
        	var xt=self.Timesheet.filter(tlist=> tlist.project==self.projectlist[i].id);
        	var tlen=xt.length
        	var x;
        	var child=[];
        	for(x=0;x<tlen;x++){
        		child.push({
        			"attr":{
        				"id": xt[x].id,
        				"F1": xt[x].Job_Header,
        				"F2": xt[x].Name_Surname,
        				"F3": xt[x].Job_Hours,
        				"F4": xt[x].Job_status,
        				"F5": false,
        				"row":xt[x]
        			}
        		})
        	}
        	if(child.length){
        		data.push({
            		"attr":{
            			"id":self.projectlist[i].id,
            			"F1":self.projectlist[i].Name,
            			"F2":self.projectlist[i].Desc,
            			"F3":self.projectlist[i].Type,
            			"F4":self.projectlist[i].status,
            			"F5": true,
            			"row":self.projectlist[i]
            		},
            		"children": child
            	});
        	}else {
        		data.push({
            		"attr":{
            			"id":self.projectlist[i].id,
            			"F1":self.projectlist[i].Name,
            			"F2":self.projectlist[i].Desc,
            			"F3":self.projectlist[i].Type,
            			"F4":self.projectlist[i].status,
            			"F5": true,
            			"row":self.projectlist[i]
            		}
        		});
        	}
        	
        }
        var options = [];
        self.datasource(new oj.FlattenedTreeTableDataSource(
                            new oj.FlattenedTreeDataSource(
                                new oj.JsonTreeDataSource(data), options)
                            )
                        );
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