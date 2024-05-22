from odoo import fields, models

class PosOrderLine(models.Model):
    _inherit = 'pos.order.line'

    seler_id = fields.Many2one('res.users', string='Seller')