# -*- coding: utf-8 -*-
{
    'name': "tableau",
    'summary': "this is a test",
    "version": "10.0",
    'author': 'Maxime Mazouffre',
    "category": "web",
    "license": "AGPL-3",
    "application": True,
    "installable": True,
    "website": "",
    'depends': [
        'web',
	'web_kanban',
    ],
    'qweb': [
        'static/src/xml/tableau.xml',
    ],
    'data': [
        'views/tableau.xml',
	'views/tableau_view.xml',
    ],
}
