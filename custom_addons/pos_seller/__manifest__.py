{
    'name': 'POS Seller',
    'version': '1.0',
    'summary': 'Module to assign sellers in POS',
    'description': """
        This module allows you to assign sellers to products in the POS interface.
    """,
    'author': 'Your Name',
    'depends': ['base', 'point_of_sale', 'hr'],
    'data': [
        'views/pos_seller_views.xml',
        'views/assets.xml',
        'security/ir.model.access.csv',
    ],
    'qweb': [
        'static/src/xml/pos_seller_template.xml',
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
}