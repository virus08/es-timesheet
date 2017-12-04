
define(['ojs/ojcore', 'knockout', 'jquery','jet-composites/filter-table/loader','jet-composites/edit-comp/loader'],
 function(oj, ko, $) {
  
    function ProjectViewModel() {
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

    return new ProjectViewModel();
  }
);
