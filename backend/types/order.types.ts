import mongoose from 'mongoose';

export type IOrderItem = {
	price: mongoose.Types.Decimal128;
	quantity: number;
	product: mongoose.Schema.Types.ObjectId;
};

export type IOrderLocation = {
	lat: number;
	lng: number;
	address: string;
	name: string;
	vicinity: string;
	googleAddressId: string;
};

export type IShippingAddress = {
	fullName: string;
	address: string;
	city: string;
	postalCode: string;
	country: string;
	location: IOrderLocation;
};

export type IPaymentResult = {
	id: string;
	status: string;
	update_time: string;
	email_address: string;
};

export type IOrder = Document & {
	orderItems: IOrderItem[];
	shippingAddress: IShippingAddress;
	paymentMethod: string;
	paymentResult: IPaymentResult;
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
	user: string;
	isPaid: boolean;
	paidAt: Date;
	isDelivered: boolean;
	deliveredAt: Date;
};
