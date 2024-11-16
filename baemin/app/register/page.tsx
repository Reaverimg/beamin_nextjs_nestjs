'use client';

import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
    });
    const [message, setMessage] = useState('');

    // Hàm xử lý thay đổi form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Hàm xử lý đăng ký
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', form);
            setMessage(response.data.message);
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Đăng ký thất bại');
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center mb-4">Đăng Ký</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
                <div className="mb-4">
                    <label className="block font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-1">Mật khẩu</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-1">Họ và Tên</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-1">Số Điện Thoại</label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Đăng Ký
                </button>
            </form>
            {message && <p className="text-center mt-4">{message}</p>}
        </div>
    );
}
