# -*- coding: utf-8 -*-
# from odoo import http


# class PosArchevani(http.Controller):
#     @http.route('/pos_archevani/pos_archevani', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/pos_archevani/pos_archevani/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('pos_archevani.listing', {
#             'root': '/pos_archevani/pos_archevani',
#             'objects': http.request.env['pos_archevani.pos_archevani'].search([]),
#         })

#     @http.route('/pos_archevani/pos_archevani/objects/<model("pos_archevani.pos_archevani"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('pos_archevani.object', {
#             'object': obj
#         })

