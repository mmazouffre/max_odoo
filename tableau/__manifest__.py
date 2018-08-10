# -*- coding: utf-8 -*-
{
    'name': "tableau",
    'summary': "this is a test",
    "version": "10.0",
    'author': 'Maxime Mazouffre',
    "category": "web",
    "application": True,
    "installable": True,
    "website": "",
    'depends': [
        'web',
	'web_kanban',
	'project',
    ],
    'qweb': [
        'static/src/xml/tableau.xml',
    ],
    'data': [
        'views/tableau_templates.xml',
	'views/tableau_view.xml',
    ],
}
