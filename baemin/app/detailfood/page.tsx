'use client'
import { Input } from "antd";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [foods, setFoods] = useState([]);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/food-item/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // Fetch foods
    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get('http://localhost:3000/food-item', {
                    params: {
                        page: 1,
                        pageSize: 10,
                        search: search || undefined,
                        categoryId: activeCategory || undefined,
                    },
                });
                setFoods(response.data);
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        };
        fetchFoods();
    }, [search, activeCategory]);

    const handleCategoryClick = (categoryId: number | null) => {
        setActiveCategory(categoryId);
    };

    const handleAddToCart = (food: any) => {
        const cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const existingItem = cart.find((item: any) => item.foodItemId === food.id);

        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.totalprice = existingItem.quantity * food.price;
        } else {
            cart.push({
                foodItemId: food.id,
                name: food.name,
                price: food.price,
                img_url: food.img_url,
                quantity: 1,
                totalprice: food.price,
            });
        }

        localStorage.setItem('cartItems', JSON.stringify(cart));
        setMessage(`Đã thêm "${food.name}" vào giỏ hàng!`);

        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    };

    return (
        <div className="flex flex-col w-full h-auto">
            <div className="w-full flex flex-row gap-3">
                {/* Danh mục */}
                <div className="w-[20%] bg-white p-5">
                    <ul>
                        <li
                            className={`cursor-pointer w-fit px-1 ${activeCategory === null ? 'bg-blue-500 text-white' : ''}`}
                            onClick={() => handleCategoryClick(null)}
                        >
                            TẤT CẢ
                        </li>
                        {categories.map((category: any) => (
                            <li
                                key={category.id}
                                className={`cursor-pointer mt-2 px-1 w-fit ${activeCategory === category.id ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() => handleCategoryClick(category.id)}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Danh sách món ăn */}
                <div className="w-[80%] h-auto bg-white py-3 flex flex-col px-4">
                    <div className="w-full mb-5">
                        <Input
                            addonBefore={<SearchOutlined />}
                            placeholder="Tìm kiếm món ăn"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col w-full pl-1 gap-3">
                        {foods.map((food: any) => (
                            <div key={food.id} className="flex flex-row gap-3 border-b pb-3" onClick={() => router.push(`/detailfood/${food.id}`)} >
                                <div className="w-[15%] relative h-16">
                                    <Image
                                        layout="fill"
                                        objectFit="cover"
                                        src={food.img_url || '/images/default-food.jpg'}
                                        alt={food.name}
                                    />
                                </div>
                                <div className="w-[60%] flex flex-col gap-1 px-2">
                                    <span className="font-bold text-[#464646]">{food.name}</span>
                                    <span className="text-wrap text-sm text-[#464646]">{food.description}</span>
                                </div>
                                <div className="w-[15%] flex justify-center items-center">
                                    <span className="text-[#0288d1] font-bold text-base">Số lượng : {food.stock}</span>
                                </div>
                                <div className="w-[15%] flex justify-center items-center">
                                    <span className="text-[#0288d1] font-bold text-base">Giá : {food.price}vnđ</span>
                                </div>
                                <div className="w-[10%] flex justify-center items-center">
                                    <div
                                        className="h-6 w-6 rounded-md flex justify-center items-center bg-blue-500 text-white font-bold cursor-pointer hover:brightness-110"
                                        onClick={() => handleAddToCart(food)}
                                    >
                                        +
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {message && <div className="text-green-500 text-center mt-4">{message}</div>}
                </div>
            </div>
        </div>
    );
}
