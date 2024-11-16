'use client';

import { AccountBookOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import DetailsCheckout from "./detailsCheckout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Checkout() {
    const router = useRouter();

    const [checkoutItems, setCheckoutItems] = useState<any[]>([]);

    useEffect(() => {
        const items = localStorage.getItem('checkoutItems');
        if (items) {
            setCheckoutItems(JSON.parse(items));
        }
    }, []);

    // Function to handle order placement
    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/order/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    items: checkoutItems.map((item) => ({
                        foodItemId: item.foodItemId,
                        quantity: item.quantity,
                    })),
                }),
            });

            if (response.ok) {
                alert('Đặt hàng thành công!');
                localStorage.removeItem('cartItems');
                window.location.href = '/statusorder';
            } else {
                console.error('Error placing order:', await response.json());
            }
        } catch (error) {
            console.error('Error during order placement:', error);
        }
    };

    return (
        <div className="px-16 flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-row items-center py-4">
                <ShoppingCartOutlined className="text-3xl text-beamin" />
                <span className="text-2xl text-beamin mx-2">|</span>
                <span className="text-3xl font-bold text-beamin">Thanh Toán</span>
            </div>

            {/* Delivery Address */}
            <div className="bg-white p-4 rounded-md">
                <div className="flex flex-row items-center">
                    <AccountBookOutlined className="text-xl text-beamin mr-2" />
                    <span className="text-xl font-bold text-beamin">Địa chỉ giao hàng</span>
                </div>
                <div className="ml-10 mt-2">
                    <span className="font-bold">Nguyen Van A</span>
                    <span className="ml-2">(+84) 123456789</span>
                    <div>Địa chỉ: 123 Le Loi, District 1, HCMC</div>
                </div>
            </div>

            {/* Order Details */}
            <div className="bg-white p-4 rounded-md">
                <DetailsCheckout items={checkoutItems} />
            </div>

            {/* Total and Checkout */}
            <div className="bg-white p-4 rounded-md flex flex-row justify-between items-center">
                <div>
                    <span className="font-bold">Tổng thanh toán:</span>
                    <span className="text-2xl text-beamin ml-2">
                        {checkoutItems.reduce((total, item) => total + (item.price * item.quantity), 0)} ₫
                    </span>
                </div>
                <button
                    onClick={handleCheckout}
                    className="bg-beamin text-white px-6 py-2 rounded-md hover:brightness-105"
                >
                    Đặt Hàng
                </button>
            </div>
        </div>
    );
}
