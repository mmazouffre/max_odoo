

odoo.define('tableau.tableau', function (require) {
    "use strict";


    var core = require('web.core');
    var form_common = require('web.form_common');
    var Model = require('web.DataModel');
    var time = require('web.time');
    var View = require('web.View');
    var KanbanRecord = require('web_kanban.Record')
    var session = require('web.session');

    var _t = core._t;
    var _lt = core._lt;
    var QWeb = core.qweb;

       

    var myView = View.extend({
	template: "Dash",
	display_name : _lt("Tableau"),
	icon : 'fa-project-diagram',
   
        init : function(parent,dataset,view_id,options) {

		  this.qweb = options.qweb;

		  var widgi = document.createElement('div');
		  widgi.className = 'oe_kanban_card';
		  var widgo = document.createElement('div');
		  widgo.className = 'oe_kanban_card';
		  var widgu = document.createElement('div');
		  widgu.className = 'oe_kanban_card';

		  this.groups = new vis.DataSet([
			{id: 1, content: widgi},
			{id: 2, content: widgo},
			{id: 3, content: widgu},
			]);

		
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


	  var container = this.$el.get(0);

	  this.timeline = new vis.Timeline(container, null, options);
	  this.timeline.on('click', this.on_click);


		},
    
    on_click: function (e) {
            // handle a click on a group header
            if (e.what == 'group-label') {
                return this.on_group_click(e);
            }
	},

    on_group_click: function (e) {
			console.log(e);
            if (e.group == -1) {
                return;
            }
            return this.do_action({
                type: 'ir.actions.act_window',
                res_model: this.fields_view.model,
                res_id: e.group,
                target: 'new',
                views: [[false, 'form']]
            });
	},

	do_search: function (domains, contexts, group_bys) {
            var self = this;
            self.last_domains = domains;
	    self.last_contexts = contexts;
	    // select the group by
            var n_group_bys = [];
            if (this.fields_view.arch.attrs.default_group_by) {
                n_group_bys = this.fields_view.arch.attrs.default_group_by.split(',');
            }
            if (group_bys.length) {
                n_group_bys = group_bys;
            }
            self.last_group_bys = n_group_bys;
            // gather the fields to get
            var fields = _.compact(_.map(["date_start", "date_delay", "date_stop", "progress"], function (key) {
                return self.fields_view.arch.attrs[key] || '';
            }));

            fields = _.uniq(fields.concat(_.pluck(this.colors, "field").concat(n_group_bys)));
            return $.when(this.has_been_loaded).then(function () {
                return self.dataset.read_slice(fields, {
                    domain: domains,
                    context: contexts
                }).then(function (data) {
                    return self.on_data_loaded(data, n_group_bys);
                });
            });

	},

	reload: function () {
            var self = this;
            if (this.last_domains !== undefined) {
                self.current_window = self.timeline.getWindow();
                return this.do_search(this.last_domains, this.last_contexts, this.last_group_bys);
            }
	},

        on_data_loaded: function (events, group_bys) {
            var self = this;
            var ids = _.pluck(events, "id");
            return this.dataset.name_get(ids).then(function (names) {
                var nevents = _.map(events, function (event) {
                    return _.extend({
                        __name: _.detect(names, function (name) {
                            return name[0] == event.id;
                        })[1]
                    }, event);
                });
                return self.on_data_loaded_2(nevents, group_bys);
            });
        },

        on_data_loaded_2: function (events, group_bys) {
            var self = this;
            var data = [];
            var groups = [];
            this.grouped_by = group_bys;
            _.each(events, function (event) {
                if (event[self.date_start]) {
                    data.push(self.event_data_transform(event));
                }
            });
            // get the groups
            var split_groups = function (events, group_bys) {
                if (group_bys.length === 0)
                    return events;
                var groups = [];
                groups.push({id: -1, content: _t('-')})
                _.each(events, function (event) {
                    var group_name = event[_.first(group_bys)];
                    if (group_name) {
                        var group = _.find(groups, function (group) {
                            return _.isEqual(group.id, group_name[0]);
                        });
                        if (group === undefined) {
                            group = {id: group_name[0], content: group_name[1]};
                            groups.push(group);
                        }
                    }
                });
                return groups;
            }
	    var options = {
              editable: this.is_action_enabled('edit'),
              deletable: this.is_action_enabled('delete'),
              fields: this.fields_view.fields,
              qweb: require('web.core').qweb,
              model: require('web.DataModel'),
              read_only_mode: this.options.read_only_mode,
            };  
            var groups = split_groups(events, group_bys);
	    var groups1 = new vis.DataSet();

	    var date = new Date();
		  date.setHours(date.getHours() +  4 * (Math.random() < 0.2));
		  var end = new Date();
		  end.setHours(date.getHours() +  200 );
		  var midend = new Date();
		  midend.setHours(date.getHours() + 90 );
		  var middate = new Date();
		  middate.setHours(date.getHours() + 110 );
	    
	    var items = new vis.DataSet();
            var i = 1;
	    groups.forEach(function(element) {
	      var kanban = new KanbanRecord(self, element, options);     
              var div = document.createElement('div');
	      div.innerHTML = QWeb.render('kanban-box', kanban.qweb_context);
		  console.log(kanban.qweb_context);
	      groups1.add({id: element.id, content: element.__name, kanban: div});
	      console.log(element);

	      items.add({id: i, group: element.id, start: element.create_date, end: element.date_deadline, content: 'Task ' + i, timeset: true,});
	      i = i + 1;
	    });
            this.timeline.setGroups(groups1);

		  


		items.add({id: 4, group: 14, start: date, end: midend, content: 'Subtask ' + 1, timeset: false, ontask: 60});
		items.add({id: 5, group: 14, start: middate, end: end, content: 'Subtask ' + 2, timeset: false, ontask: 0});
		items.add({id: 6, group: 15, start: date, end: midend, content: 'SubTask ' + 1, timeset: false, ontask: 0});
		items.add({id: 7, group: 15, start: middate, end: end, content: 'Subtask ' + 2, timeset: false, ontask: 0});
		items.add({id: 8, group: 16, start: date, end: midend, content: 'Subtask ' + 1, timeset: false, ontask: 100});
		items.add({id: 9, group: 16, start: middate, end: end, content: 'Subtask ' + 2, timeset: false, ontask: 20});
            this.timeline.setItems(items);


            if (!this.mode || this.mode == 'fit'){
                this.timeline.fit();
            }
		},
    });



    core.view_registry.add('tableau', myView);
    return myView;


});
