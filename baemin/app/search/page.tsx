'use client'
import { ShoppingCartOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import TypeSelector from './type';
import AreaSelector from './area';
import FilterSelector from './filter';
import ResultFood from './result';
import axios from 'axios';

const Page: React.FC = () => {
    const items = [{
        id: '1',
        name: 'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
        kind: 'Quán Ăn',
    },
    {
        id: '1',
        name: 'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
        kind: 'Quán Ăn',
    },
    {
        id: '1',
        name: 'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
        kind: 'Quán Ăn',
    },
    {
        id: '1',
        name: 'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
        kind: 'Quán Ăn',
    },
    {
        id: '1',
        name: 'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
        kind: 'Quán Ăn',
    },
    {
        id: '1',
        name: 'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
        kind: 'Quán Ăn',
    },
    {
        id: '1',
        name: 'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
        kind: 'Quán Ăn',
    },
    {
        id: '1',
        name: 'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
        kind: 'Quán Ăn',
    },
    {
        id: '1',
        name: 'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
        kind: 'Quán Ăn',
    },
    {
        id: '1',
        name: 'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
        kind: 'Quán Ăn',
    },
    {
        id: '1',
        name: 'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
        kind: 'Quán Ăn',
    },
    {
        id: '1',
        name: 'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
        kind: 'Quán Ăn',
    },
    {
        id: '1',
        name: 'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address: '102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img: '/food/ga1.jpg',
        kind: 'Quán Ăn',
    },
    ]
    const [foods, setFoods] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [search, setSearch] = useState('');
    const [categoryId, setCategoryId] = useState<number | null>(null);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get('http://localhost:3000/food-item', {
                    params: { page, pageSize, search, categoryId },
                });
                setFoods(response.data);
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        };

        fetchFoods();
    }, [page, pageSize, search, categoryId]);

    return (
        <>
            <div className='w-full flex flex-row justify-between items-center border-b border-solid'>
                <div className='flex flex-row gap-3'>
                    <AreaSelector />
                    <TypeSelector />
                </div>
                <div className='flex items-center justify-center '>
                    <FilterSelector />
                </div>
            </div>
            <ResultFood items={foods} />
        </>
    )
}
export default Page;