import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true}, //ID of the user placing the order.
    items: {type: Array, required: true}, //List of ordered items.
    amount: {type: Number, required: true}, //Total amount for the order
    address: {type: Object, required: true}, //The delivery address.
    status: {type: String, required: true, default: 'Order Placed'}, //Current status of the order.
    paymentMethod: {type: String, required: true}, //The selected payment method.
    payment: {type: Boolean, required: true, default: false}, //Whether the payment is confirmed.
    date: {type: Number, required: true}, //Date of order placement

})

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel; 