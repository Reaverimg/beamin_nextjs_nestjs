'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function FoodDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const [food, setFood] = useState<any>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchFoodDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/food-item/${id}`);
                setFood(response.data);
            } catch (error) {
                console.error('Error fetching food details:', error);
            }
        };

        if (id) fetchFoodDetail();
    }, [id]);

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const existingItem = cart.find((item: any) => item.foodItemId === food.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                foodItemId: food.id,
                name: food.name,
                price: food.price,
                quantity: 1,
                totalprice: food.price,
            });
        }

        localStorage.setItem('cartItems', JSON.stringify(cart));
        setMessage('Thêm vào giỏ hàng thành công!');
    };

    if (!food) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <div className="flex flex-col items-center">
                <div className="w-[40%] h-64 relative">
                    <Image
                        src={food.img_url || '/images/default-food.jpg'}
                        layout="fill"
                        objectFit="cover"
                        alt={food.name}
                    />
                </div>
                <h1 className="text-3xl font-bold mt-4">{food.name}</h1>
                <p className="text-gray-600 mt-2">{food.description}</p>
                <p className="text-xl font-semibold mt-2">{food.price} VND</p>
                <p className="text-sm text-gray-500 mt-1">Số lượng: {food.stock}</p>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Thêm vào giỏ hàng
                </button>
                {message && <p>{message}</p>}
            </div>

        </div>
    );
}
