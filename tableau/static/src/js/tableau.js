

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
    });



    core.view_registry.add('tableau', myView);
    return myView;


});
