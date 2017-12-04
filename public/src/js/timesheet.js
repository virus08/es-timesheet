define(['ojs/ojcore'], function (oj) {
    var TimesheetsFactory = {
        resourceUrl: 'http://localhost:8080/api/timesheets',
        // Create a single movie instance:
        createTimesheetsModel: function () {
            var Timesheets = oj.Model.extend({
                urlRoot: this.resourceUrl, 
                idAttribute: "_id"
            });
            return new Timesheets();
        },
        // Create a movie collection:
        createTimesheetCollection: function () {
            var Timesheets = oj.Collection.extend({
                url: this.resourceUrl, 
                model: this.createMovieModel()
            });
            return new Timesheets();
        }
    };
    return TimesheetFactory;
});