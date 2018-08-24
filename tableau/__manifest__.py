# -*- coding: utf-8 -*-
{
    'name': "tableau",
    'summary': "This allow you to plan your tasks on timeline",
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
	'dynalec_project'
    ],
    'qweb': [
        'static/src/xml/tableau.xml',
    ],
    'data': [
        'views/tableau_templates.xml',
	'views/tableau_view.xml',
    ],
}
