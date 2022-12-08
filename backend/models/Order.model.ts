import mongoose from 'mongoose';
import { IOrder } from '../types/order.types';

const orderSchema = new mongoose.Schema<IOrder>(
	{
		orderItems: [
			{
				quantity: { type: Number, required: true },
				price: { type: mongoose.Types.Decimal128, required: true },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
			},
		],
		shippingAddress: {
			fullName: { type: String, required: true },
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true },
			location: {
				lat: Number,
				lng: Number,
				address: String,
				name: String,
				vicinity: String,
				googleAddressId: String,
			},
		},
		paymentMethod: { type: String, required: true },
		paymentResult: {
			id: String,
			status: String,
			update_time: String,
			email_address: String,
		},
		itemsPrice: { type: Number, required: true },
		shippingPrice: { type: Number, required: true },
		taxPrice: { type: Number, required: true },
		totalPrice: { type: Number, required: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		isPaid: { type: Boolean, default: false },
		paidAt: { type: Date },
		isDelivered: { type: Boolean, default: false },
		deliveredAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
