

odoo.define('tableau.tableau', function (require) {
    "use strict";


    var core = require('web.core');
    var form_common = require('web.form_common');
    var Model = require('web.DataModel');
    var time = require('web.time');
    var View = require('web.View');

    var _t = core._t;
    var _lt = core._lt;
    var QWeb = core.qweb;
    
    var myView = View.extend({
	template: "Dash",
	display_name : _lt("Tableau"),
	icon : 'fa-project-diagram',
   
        init : function(parent,dataset,view_id,options) {
		
		  this.groups = new vis.DataSet([
			{id: 1, content: 'Widgi'},
			{id: 2, content: 'Widgo'},
			{id: 3, content: 'Widgu'},
			]);

		  var date = new Date();
		  date.setHours(date.getHours() +  4 * (Math.random() < 0.2));
		  var end = new Date();
		  end.setHours(date.getHours() +  200 );
		  var midend = new Date();
		  midend.setHours(date.getHours() + 90 );
		  var middate = new Date();
		  middate.setHours(date.getHours() + 110 );

		  this.items = new vis.DataSet([
			{id: 1, group: 1, start: date, end: end, content : 'Task ' + 1, timeset: true},
			{id: 2, group: 2, start: date, end: end, content : 'Task ' + 2, timeset: true},
			{id: 3, group: 3, start: date, end: end, content : 'Task ' + 3, timeset: true},
			]);


		this.items.add({id: 4, group: 1, start: date, end: midend, content: 'Subtask ' + 1, timeset: false, ontask: 60});
		this.items.add({id: 5, group: 1, start: middate, end: end, content: 'Subtask ' + 2, timeset: false, ontask: 0});
		this.items.add({id: 6, group: 2, start: date, end: midend, content: 'SubTask ' + 1, timeset: false, ontask: 0});
		this.items.add({id: 7, group: 2, start: middate, end: end, content: 'Subtask ' + 2, timeset: false, ontask: 0});
		this.items.add({id: 8, group: 3, start: date, end: midend, content: 'Subtask ' + 1, timeset: false, ontask: 100});
		this.items.add({id: 9, group: 3, start: middate, end: end, content: 'Subtask ' + 2, timeset: false, ontask: 20});
		
		return this._super.apply(this,arguments)

		},

	start : function()  {
		
	  // Configuration for the Timeline
	  var options = {
	    stack: false,
	    start: new Date(),
	    end: new Date(1000*60*60*24 + (new Date()).valueOf()),
	    editable: true,
	    margin: {
	      item: 10, // minimal margin between items
	      axis: 5   // minimal margin between items and the axis
	    },
	    orientation: 'top'
	  };


	  var container = this.$el.get(2);
	  console.log(container);

	  var timeline = new vis.Timeline(container, null, options);
	  timeline.setGroups(this.groups);
	  timeline.setItems(this.items);
		},

    });



    core.view_registry.add('tableau', myView);
    return myView;


});
