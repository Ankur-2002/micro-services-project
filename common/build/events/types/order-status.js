"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    // When the order has been created, but the ticktet it is trying to order has not been reserved
    OrderStatus["Create"] = "created";
    // The ticket the order is trying to reserver has already been reserved, or when the user has cancelled the order. The order expires before payment.
    OrderStatus["Cancelled"] = "cancelled";
    // The order has sucessfully reserved the ticket
    OrderStatus["AwaitingPayment"] = "awaiting:payment";
    // The order has reserved the ticket and the user has provided payment successfully
    OrderStatus["Complete"] = "complete";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
