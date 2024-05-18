odoo.define('pos_seller.PosSellerButton', function (require) {
    "use strict";

    const { PosComponent } = require('point_of_sale.PosComponent');
    const Registries = require('point_of_sale.Registries');
    const ProductScreen = require('point_of_sale.ProductScreen');

    class PosSellerButton extends PosComponent {
        async onClick() {
            const employees = await this.rpc({
                model: 'hr.employee',
                method: 'search_read',
                args: [[['category_ids', '=', 'sale']], ['id', 'name']],
            });

            const selection = await this.showPopup('SelectionPopup', {
                title: this.env._t('Select a Seller'),
                list: employees.map(employee => ({
                    id: employee.id,
                    label: employee.name,
                    isSelected: false,
                })),
            });

            if (selection.confirmed) {
                const seller = selection.payload;
                const order = this.env.pos.get_order();
                const selected_orderline = order.get_selected_orderline();
                if (selected_orderline) {
                    selected_orderline.set_seller(seller.id);
                }
            }
        }
    }

    PosSellerButton.template = 'PosSellerButton';

    ProductScreen.addControlButton({
        component: PosSellerButton,
        condition: function () {
            return true;
        },
    });

    Registries.Component.add(PosSellerButton);

    return PosSellerButton;
});