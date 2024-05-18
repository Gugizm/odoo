from odoo import models, fields

class PosSeller(models.Model):
    _name = 'pos.seller'
    _description = 'POS Seller'

    name = fields.Char(string='Seller Name')
    tag_ids = fields.Many2many('pos.category', string='Tags')