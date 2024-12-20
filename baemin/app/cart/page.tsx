'use client';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import DetailsCart from './detailsCart';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const [cartDetails, setCartDetails] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const router = useRouter();

    const handleRemoveItem = (index: number) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    const handleCheckout = () => {
        if (checkoutItems.length === 0) {
            alert("Chọn ít nhất một sản phẩm để thanh toán");
            return;
        }
        localStorage.setItem('checkoutItems', JSON.stringify(checkoutItems));
        router.push('/checkout');
    };

    const handleSelectItem = (item: any) => {
        setCheckoutItems((prev) => [...prev, item]);
    };

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setCartDetails(data);

                // Tính tổng tiền
                const total = data.reduce((sum: number, item: any) => sum + item.foodItem.price * item.quantity, 0);
                setTotalPrice(total);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    useEffect(() => {
        const items = localStorage.getItem('cartItems');
        if (items) {
            setCartItems(JSON.parse(items));
        }
    }, []);

    return (
        <>
            <div className="flex flex-row w-full h-20 bg-white ">
                <div className="w-1/2 h-full flex flex-row items-center gap-3">
                    <div className="ml-10 text-4xl text-beamin font-bold">
                        <ShoppingCartOutlined />
                    </div>
                    <div className="text-2xl text-beamin">|</div>
                    <div className="text-3xl text-beamin font-bold">Giỏ hàng</div>
                </div>
            </div>
            <div className="mt-4 px-16 flex flex-col gap-4 pb-16 rounded-md">
                <div className="w-full h-16 bg-white grid grid-cols-12">
                    <div className="pl-8 col-span-4 flex items-center flex-row gap-5">
                        <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800"
                        />
                        <span className="text-base font-normal"> Món Ăn</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                        <span className="text-base font-normal text-gray-600">Đơn giá</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                        <span className="text-base font-normal text-gray-600">Số lượng</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                        <span className="text-base font-normal text-gray-600">Số tiền</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                        <span className="text-base font-normal text-gray-600">Thao tác</span>
                    </div>
                </div>
                <DetailsCart
                Details={cartItems}
                onRemoveItem={handleRemoveItem}
            />
                <div className="flex flex-row fixed bottom-0 w-[90.6%] mr-16 h-16 bg-white items-center">
                    <div className="flex flex-row gap-2 w-1/2 h-full items-center ml-10">
                        <div className="cursor-pointer hover:text-red-600">Hủy</div>
                        <div> Tổng thanh toán:</div>
                        <div className="text-red-600">{totalPrice.toLocaleString()} ₫</div>
                    </div>
                    <div className="flex flex-row gap-2 w-1/2 h-full items-center justify-end pr-2">
                        <Button
                            onClick={handleCheckout}
                            style={{ background: '#3AC5C9', color: 'white' }}
                            className="bg-beamin text-white w-40 h-10 rounded-md hover:brightness-105"
                        >
                            Thanh toán
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
