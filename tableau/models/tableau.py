# -*- coding: utf-8 -*-
from openerp import fields, models


from odoo import api, fields, models, tools, SUPERUSER_ID, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.safe_eval import safe_eval

TABLEAU_VIEW = ('tableau', 'Tableau')

class tableau(models.Model):
    _inherit = 'ir.ui.view'

    type = fields.Selection(selection_add=[TABLEAU_VIEW])
