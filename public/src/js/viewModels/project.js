
define(['ojs/ojcore', 'knockout', 'ojs/ojdialog','jquery','jet-composites/proj-table/loader',
	'jet-composites/proj-added/loader','jet-composites/data-table/loader','jet-composites/edit-comp/loader',
	'jet-composites/add-job/loader','jet-composites/proj-edit/loader'],
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
