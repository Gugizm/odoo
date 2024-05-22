{
    'name': 'POS Custom Seller',
    'version': 1.0,
    'category': 'Point of Sale',
    'summary': 'Assign different seller to each product in a POS order line',
    'depends': ['point_of_sale'],
    'data': [
        'views/pos_order_line_view.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'pos_custom_seller/static/src/js/pos_order_line.js',
        ],
    },

}