# -*- coding: utf-8 -*-
from openerp import fields, models


from odoo import api, fields, models, tools, SUPERUSER_ID, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.safe_eval import safe_eval

class tableau(models.Model):

    _name = "tableau.tableau"
    _description = "Tableau"
    _record_name = "fullname"

    fullname = fields.Char('Full Metal Name')
