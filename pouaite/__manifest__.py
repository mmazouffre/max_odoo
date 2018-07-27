# Copyright 2016 ACSONE SA/NV (<http://acsone.eu>)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

{
    'name': "pouaite",
    'summary': "Interactive visualization chart to show events in time",
    "version": "11.0.1.0.1",
    'author': 'ACSONE SA/NV, '
              'Tecnativa, '
              'Monk Software, '
              'Odoo Community Association (OCA)',
    "category": "web",
    "license": "AGPL-3",
    "application": False,
    "installable": True,
    "website": "http://acsone.eu",
    'depends': [
        'web',
    ],
    'qweb': [
        'static/src/xml/pouaite.xml',
    ],
    'data': [
        'views/pouaite.xml',
    ],
}
