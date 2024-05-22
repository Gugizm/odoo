// Define a new module in Odoo
odoo.define('pos_custom_seller.PosOrderLine', function (require) {
    'use strict';

    // Import dependencies
    const PosOrderLine = require('point_of_sale.models').PosOrderLine;
    const models = require('point_of_sale.models');

    // Load the new field 'seller_id' into the 'pos.order.line' model
    models.load_fields('pos.order.line', ['seller_id']);

    // Extend the Orderline model
    const _super_orderline = models.Orderline.prototype;
    models.Orderline = models.Orderline.extend({
        // Initialize the order line with the 'seller_id' field
        initialize: function (attr, options) {
            _super_orderline.initialize.call(this, attr, options);
            this.seller_id = this.seller_id || false;
        },
        // Set the 'seller_id' field and trigger a change event
        set_seller: function (seller) {
            this.seller_id = seller;
            this.trigger('change', this);
        },
        // Get the value of the 'seller_id' field
        get_seller: function () {
            return this.seller_id;
        },
        // Include 'seller_id' when exporting the order line to JSON
        export_as_JSON: function () {
            const json = _super_orderline.export_as_JSON.call(this);
            json.seller_id = this.seller_id;
            return json;
        },
        // Initialize the order line from JSON, including 'seller_id'
        init_from_JSON: function (json) {
            _super_orderline.init_from_JSON.call(this, json);
            this.seller_id = json.seller_id;
        }
    });

    // Extend the POS model to load users
    const PosModelSuper = models.PosModel.prototype;
    models.PosModel = models.PosModel.extend({
        initialize: function (session, attributes) {
            const self = this;
            PosModelSuper.initialize.call(this, session, attributes);
            this.ready.then(function () {
                self.models.push({
                    model: 'res.users',
                    fields: ['id', 'name'],
                    loaded: function (self, users) {
                        self.users = users;
                        self.seller_by_id = {};
                        users.forEach(user => {
                            self.seller_by_id[user.id] = user;
                        });
                    }
                });
            });
        }
    });

    // Extend the Orderline Widget to handle seller selection
    const OrderlineWidget = require('point_of_sale.Orderline');
    const PosBaseWidget = require('point_of_sale.BaseWidget');

    const OrderlineWidgetSuper = OrderlineWidget.prototype;
    OrderlineWidget.include({
        // Render the element with a click event to select seller
        renderElement: function () {
            this._super();
            const self = this;
            this.$el.on('click', '.select-seller', function () {
                self.gui.show_popup('selection', {
                    title: 'Select Seller',
                    list: self.pos.users.map(user => ({
                        label: user.name,
                        item: user,
                    })),
                    confirm: function (seller) {
                        self.orderline.set_seller(seller.id);
                    },
                });
            });
        }
    });

    // Extend the Order Widget to display the seller
    const OrderWidget = require('point_of_sale.OrderWidget');
    OrderWidget.include({
        render_orderline: function (orderline) {
            const el_node = this._super(orderline);
            const seller_id = orderline.get_seller();
            const seller = this.pos.seller_by_id[seller_id];
            if (seller) {
                el_node.querySelector('.info').innerHTML += `<span class="seller">Seller: ${seller.name}</span>`;
            }
            return el_node;
        }
    });

});
