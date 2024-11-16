import React from 'react';

export default function DetailsCart({ Details, onRemoveItem }: any) {
    return (
        <div>
            {Details?.map((restaurant: any, index: number) => (
                <div key={index} className="cart-restaurant">
                    <h2>{restaurant.name}</h2>
                    {restaurant.items.map((item: any, idx: number) => (
                        <div key={idx} className="cart-item">
                            <p>{item.namefood}</p>
                            <p>{item.quantity} x {item.price.toLocaleString()} ₫</p>
                            <button onClick={() => onRemoveItem(idx)}>Remove</button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
