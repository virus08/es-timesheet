
define(['ojs/ojcore', 'knockout', 'promise', 'jquery','ojs/ojdialog','jet-composites/data-table/loader','jet-composites/edit-comp/loader'],
 function(oj, ko, $) {
  
    function TimesheetViewModel() {
      var self = this;
      self.columnarray = [ 
			{"headerText" : "Job name","field" : "Job_Header"}, 
			{"headerText" : "Job type","field" : "Job_Type"},
			{"headerText" : "Deadline","field" : "Job_date"}, 
			{"headerText" : "Status","field" : "Job_status"},
			{"headerText": "Action","field": "Rating","renderer": oj.KnockoutTemplateUtils.getRenderer("Action", true)}] 
     
      self.handleActivated = function(info) {
        // Implement if needed
      };

      self.handleAttached = function(info) {
        // Implement if needed
      };
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    return new TimesheetViewModel();
  }
);
