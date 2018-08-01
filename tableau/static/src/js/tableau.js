

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
    
    var myView = form_common.FormWidget.extend({
        renderElement: function() {
            this._super();
            this.form_template = 'Dash';
            var rendered = QWeb.render(this.form_template, this);
            this.$el.html(rendered);
        }
    })



core.form_tag_registry
    .add('dash', myView);


});
