
DROP DATABASE IF EXISTS baemin;
CREATE DATABASE baemin;

-- Tạo bảng User để lưu thông tin người dùng
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    role VARCHAR(50) DEFAULT 'user', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Address để lưu địa chỉ của người dùng
CREATE TABLE "Address" (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "User"(id) ON DELETE CASCADE,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    zip_code VARCHAR(20),
    country VARCHAR(50) DEFAULT 'Vietnam',
    is_default BOOLEAN DEFAULT FALSE
);

-- Tạo bảng Category để lưu danh mục thức ăn (e.g., Gà rán, Burger)
CREATE TABLE "Category" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Tạo bảng FoodItem để lưu thông tin các món ăn
CREATE TABLE "FoodItem" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    img_url VARCHAR(255),
    category_id INT REFERENCES "Category"(id) ON DELETE SET NULL,
    stock INT DEFAULT 0,
    rating NUMERIC(2, 1) DEFAULT 0,  
    is_available BOOLEAN DEFAULT TRUE,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Order để lưu thông tin đơn hàng
CREATE TABLE "Order" (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "User"(id) ON DELETE SET NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng OrderItem để lưu thông tin các món trong từng đơn hàng
CREATE TABLE "OrderItem" (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES "Order"(id) ON DELETE CASCADE,
    food_item_id INT REFERENCES "FoodItem"(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

-- Tạo bảng Payment để lưu thông tin thanh toán cho đơn hàng
CREATE TABLE "Payment" (
    id SERIAL PRIMARY KEY,
    order_id INT UNIQUE REFERENCES "Order"(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    method VARCHAR(50) NOT NULL, 
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Shipping" (
    id SERIAL PRIMARY KEY,
    order_id INT UNIQUE REFERENCES "Order"(id) ON DELETE CASCADE,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    estimated_delivery TIMESTAMP, 
    actual_delivery TIMESTAMP      
);

-- Thêm người dùng vào bảng User
INSERT INTO "User" (email, password, name, phone, role) VALUES
('user1@example.com', 'hashedpassword1', 'Nguyễn Văn A', '0912345678', 'user'),
('user2@example.com', 'hashedpassword2', 'Trần Thị B', '0987654321', 'user'),
('user3@example.com', 'hashedpassword3', 'Lê Văn C', '0901122334', 'user'),
('admin@example.com', 'hashedpasswordadmin', 'Admin User', '0901222333', 'admin');

-- Thêm địa chỉ cho người dùng vào bảng Address
INSERT INTO "Address" (user_id, street, city, state, zip_code, country, is_default) VALUES
(1, '123 Lê Lợi', 'Quận 1', 'Hồ Chí Minh', '700000', 'Vietnam', TRUE),
(2, '456 Nguyễn Trãi', 'Quận 5', 'Hồ Chí Minh', '700000', 'Vietnam', TRUE),
(3, '789 Lý Thái Tổ', 'Quận 10', 'Hồ Chí Minh', '700000', 'Vietnam', TRUE),
(4, '12 Nguyễn Huệ', 'Quận 1', 'Hồ Chí Minh', '700000', 'Vietnam', TRUE);

-- Thêm danh mục thức ăn vào bảng Category
INSERT INTO "Category" (name, description) VALUES
('Gà rán', 'Các món gà rán thơm ngon, giòn rụm'),
('Burger', 'Các loại burger với hương vị hấp dẫn'),
('Bún', 'Các món bún truyền thống Việt Nam'),
('Mì', 'Các món mì đa dạng từ khắp nơi'),
('Pizza', 'Pizza với đa dạng hương vị và kiểu dáng');

-- Thêm món ăn vào bảng FoodItem
INSERT INTO "FoodItem" (name, description, price, img_url, category_id, stock, rating, is_available) VALUES
('Gà rán KFC', 'Gà rán giòn tan, thơm ngon đến miếng cuối cùng', 50000, '/images/ga_ran_kfc.jpg', 1, 100, 4.5, TRUE),
('Burger bò', 'Burger bò nướng thơm ngon, kèm sốt đặc biệt', 75000, '/images/burger_bo.jpg', 2, 50, 4.2, TRUE),
('Bún bò Huế', 'Bún bò chuẩn vị Huế, cay nồng và đậm đà', 60000, '/images/bun_bo_hue.jpg', 3, 30, 4.8, TRUE),
('Mì xào giòn', 'Mì xào giòn với thịt bò và rau củ', 45000, '/images/mi_xao_gion.jpg', 4, 20, 4.0, TRUE),
('Pizza Hải sản', 'Pizza Hải sản với phô mai và hải sản tươi ngon', 120000, '/images/pizza_hai_san.jpg', 5, 15, 4.6, TRUE),
('Burger gà', 'Burger gà chiên giòn với rau và sốt đặc biệt', 70000, '/images/burger_ga.jpg', 2, 25, 4.3, TRUE),
('Gà rán Lotteria', 'Gà rán Lotteria giòn rụm, hương vị hấp dẫn', 55000, '/images/ga_ran_lotteria.jpg', 1, 80, 4.4, TRUE),
('Mì cay Hàn Quốc', 'Mì cay cấp độ với hương vị Hàn Quốc', 50000, '/images/mi_cay_hq.jpg', 4, 35, 4.1, TRUE);

-- Thêm đơn hàng vào bảng Order
INSERT INTO "Order" (user_id, total_amount, status) VALUES
(1, 150000, 'Pending'),
(2, 130000, 'Shipped'),
(3, 180000, 'Delivered'),
(1, 75000, 'Processing');

-- Thêm các món trong đơn hàng vào bảng OrderItem
INSERT INTO "OrderItem" (order_id, food_item_id, quantity, price) VALUES
(1, 1, 2, 50000),
(1, 2, 1, 75000),
(2, 3, 2, 60000),
(3, 5, 1, 120000),
(3, 4, 2, 45000),
(4, 2, 1, 75000);

-- Thêm thanh toán vào bảng Payment
INSERT INTO "Payment" (order_id, amount, method) VALUES
(1, 150000, 'MoMo'),
(2, 130000, 'ZaloPay'),
(3, 180000, 'Credit Card'),
(4, 75000, 'COD');

-- Thêm thông tin giao hàng vào bảng Shipping
INSERT INTO "Shipping" (order_id, address, phone, estimated_delivery, actual_delivery) VALUES
(1, '123 Lê Lợi, Quận 1, Hồ Chí Minh', '0912345678', '2024-11-05 14:00:00', NULL),
(2, '456 Nguyễn Trãi, Quận 5, Hồ Chí Minh', '0987654321', '2024-11-06 10:00:00', '2024-11-06 09:45:00'),
(3, '789 Lý Thái Tổ, Quận 10, Hồ Chí Minh', '0901122334', '2024-11-07 16:00:00', '2024-11-07 15:30:00'),
(4, '12 Nguyễn Huệ, Quận 1, Hồ Chí Minh', '0912345678', '2024-11-08 18:00:00', NULL);
