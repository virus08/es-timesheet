
define(['ojs/ojcore', 'knockout', 'jquery','jet-composites/data-table/loader'],
 function(oj, ko, $) {
  
    function TimesheetViewModel() {
      var self = this;
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
