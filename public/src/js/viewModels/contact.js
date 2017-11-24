
define(['ojs/ojcore', 'knockout', 'jquery','jet-composites/my-chart/loader'],
 function(oj, ko, $) {
  
    function ContactViewModel() {
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

    return new ContactViewModel();
  }
);
