CREATE DATABASE CoffeeShopDB
use CoffeeShopDB
 
-- USERS TABLE (renamed from Roles)
CREATE TABLE Users (
Email VARCHAR(255) PRIMARY KEY,
Username VARCHAR(100) NOT NULL,
Password NVACHAR(200) NOT NULL,
UserRole VARCHAR(50) CHECK (UserRole IN ('Admin', 'Customer')) NOT NULL,
isActive BIT
);
 
-- AUTHENTICATION DETAILS (separated for security)
CREATE TABLE UserAuth (
UsersID INT PRIMARY KEY,
Email VARCHAR(255),
HashedPassword VARCHAR(255) NOT NULL,
Salt VARCHAR(255) NOT NULL,
FOREIGN KEY (Email) REFERENCES Users(Email)
);
 
-- CUSTOMERS TABLE
CREATE TABLE Customers (
CustomerID VARCHAR(13) PRIMARY KEY, -- Changed from INT to VARCHAR(13)
FullName VARCHAR(100) NOT NULL,
Email VARCHAR(255) NOT NULL,
Password NVARCHAR (200) NOT NULL,
PhoneNumber VARCHAR(20) NOT NULL,
Address VARCHAR(255),
CreatedAt DATETIME DEFAULT GETDATE(),
FOREIGN KEY (Email) REFERENCES Users(Email),
CONSTRAINT CK_Customers_IDNumber_Length CHECK (
LEN(CustomerID) = 13 AND CustomerID NOT LIKE '%[^0-9]%')
);
 
-- MENU TABLE
CREATE TABLE Menu (
ItemID INT IDENTITY(1,1) PRIMARY KEY,
ItemName VARCHAR(100) NOT NULL,
ItemType VARCHAR(50) CHECK (ItemType IN ('Hot', 'Cold', 'Snack')) NOT NULL,
ItemDescription VARCHAR(300),
Price DECIMAL(10,2) NOT NULL,
IsAvailable BIT DEFAULT 1,
ImageUrl VARCHAR(255)
);
 
INSERT INTO Menu VALUES 
('Ice Coffee', 'Cold', 27.00),
('Cappacino', 'Hot', 20.00);

-- STOCK TABLE
CREATE TABLE Stock (
StockNum INT IDENTITY(1,1) PRIMARY KEY,
StockName VARCHAR(100) NOT NULL,
Available_Stock INT NOT NULL,
Arrival_Date DATE NOT NULL,
StockStatus VARCHAR(50) CHECK (StockStatus IN ('Available', 'Low', 'Out of Stock')),
Unit VARCHAR(50) DEFAULT 'Kg',
SupplierName VARCHAR(100),
);
 
-- ORDERS TABLE
CREATE TABLE Orders (
OrderNum INT IDENTITY(100,1) PRIMARY KEY,
ItemID INT NOT NULL,
CustomerID VARCHAR(13) NOT NULL, -- Changed
Address VARCHAR(255) NOT NULL,
Date DATE NOT NULL,
OrderType VARCHAR(50) CHECK (OrderType IN ('EatIn', 'Takeout')) NOT NULL,
Quantity INT NOT NULL,
OrderStatus VARCHAR(50) CHECK (OrderStatus IN ('Pending', 'Completed', 'Cancelled')) DEFAULT 'Pending',
TotalPrice DECIMAL(10,2),
FOREIGN KEY (ItemID) REFERENCES Menu(ItemID),
FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID) -- Updated FK
);
 
-- PAYMENTS TABLE

CREATE TABLE Payments (
PaymentID INT IDENTITY(1,1) PRIMARY KEY,
OrderNum INT NOT NULL,
Amount DECIMAL(10,2) NOT NULL,
PaymentMethod VARCHAR(50) CHECK (PaymentMethod IN ('Cash', 'Card', 'EFT')),
PaymentDate DATETIME DEFAULT GETDATE(),
FOREIGN KEY (OrderNum) REFERENCES Orders(OrderNum)
);
 
-- CARD DETAILS TABLE
CREATE TABLE CardDetails (
AccountNumber VARCHAR(30) PRIMARY KEY NOT NULL,
Accountholder VARCHAR(100) NOT NULL,
AccountType VARCHAR(50) NOT NULL,
CardNumber VARCHAR(20) NOT NULL,
CVV VARCHAR(4) NOT NULL,
ExpiryDate DATE NOT NULL,
IsEncrypted BIT DEFAULT 0,
CustomerID VARCHAR(13) NOT NULL, -- Changed
FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- TABLES (DINING TABLES) TABLE
CREATE TABLE TableReservations (
TableNum INT PRIMARY KEY,
ReservationDate DATE NOT NULL,
ReservationTime TIME NOT NULL,
PartySize INT NOT NULL,
CustomerID VARCHAR(13) NOT NULL, -- Changed
CustomerName NVARCHAR(80),
tableStatus VARCHAR(50) CHECK (tableStatus IN ('Booked', 'Seated', 'Cancelled')) DEFAULT 'Booked',
 Occasion VARCHAR(100),
Notes VARCHAR(255),
CreatedAt DATETIME DEFAULT GETDATE(),
FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
 
-- REVIEWS TABLE
CREATE TABLE Reviews (
ReviewID INT IDENTITY(1,1) PRIMARY KEY,
CustomerID VARCHAR(13) NOT NULL, -- Changed
Rating INT CHECK (Rating BETWEEN 1 AND 5),
Comment VARCHAR(500),
ReviewDate DATETIME DEFAULT GETDATE(),
FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
 
-- DELIVERIES TABLE
CREATE TABLE Deliveries (
DeliveryID INT IDENTITY(1,1) PRIMARY KEY,
OrderNum INT NOT NULL,
DeliveryAddress VARCHAR(255),
DeliveryStatus VARCHAR(50) CHECK (DeliveryStatus IN ('Preparing', 'On the Way', 'Delivered')) DEFAULT 'Preparing',
EstimatedTime TIME,
FOREIGN KEY (OrderNum) REFERENCES Orders(OrderNum)
);
 
-- AUDIT LOGS TABLE
CREATE TABLE AuditLogs (
LogID INT IDENTITY(1,1) PRIMARY KEY,
TableAffected VARCHAR(100),
ActionPerformed VARCHAR(50),
PerformedBy VARCHAR(100),
AuditTimestamp DATETIME DEFAULT GETDATE()
);

-- Cart table
CREATE TABLE Cart (
CartID INT IDENTITY(1,1) PRIMARY KEY,
OrderNum INT NOT NULL,
ItemID INT NOT NULL, -- Still linking back to the original Menu item (optional)
ItemName VARCHAR(100) NOT NULL,
Category VARCHAR(50),
ItemType VARCHAR(50) CHECK (ItemType IN ('Hot', 'Cold', 'Snack')) NOT NULL,
ItemDescription VARCHAR(300),
Price DECIMAL(10,2) NOT NULL,
IsAvailable BIT DEFAULT 1,
ImageUrl VARCHAR(255),
DateAdded DATETIME DEFAULT GETDATE(),
FOREIGN KEY (OrderNum) REFERENCES Orders(OrderNum)
);
 
-- JWT SERVICES - REFRESH TOKENS
CREATE TABLE RefreshTokens (
Id INT IDENTITY(1,1) PRIMARY KEY,
Token NVARCHAR(500) NOT NULL,
CustomerID VARCHAR(13) NOT NULL, -- Changed
Expires DATETIME2 NOT NULL,
Created DATETIME2 NOT NULL,
Revoked DATETIME2 NULL,
ReplacedByToken NVARCHAR(500) NULL,
CONSTRAINT FK_RefreshTokens_Customers_CustomerID FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

Promotions: CREATE TABLE PromotionHistory (
PromotionID INT IDENTITY(1,1) PRIMARY KEY,
CustomerID VARCHAR(13) NOT NULL,
RefreshTokenID INT NOT NULL,
PromotionType VARCHAR(100), -- e.g., 'Discount', 'Loyalty Points', etc.
PromotionValue DECIMAL(10,2), -- e.g., 10.00 for R10 discount
PromotionDate DATETIME DEFAULT GETDATE(),
Notes VARCHAR(255),
ALTER TABLE PromotionHistory ADD Used BIT DEFAULT 0;
FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
FOREIGN KEY (RefreshTokenID) REFERENCES RefreshTokens(Id)
);                                                                                                              
 
-- INSERT MENU ITEMS WITH UPDATED ZAR PRICES & TASTY DESCRIPTIONS
INSERT INTO Menu (ItemName, ItemType, ItemDescription, Price, ImageUrl) VALUES
('Cortado', 'Hot', 'A bold espresso gently mellowed with a splash of warm milk — small but mighty.', 27.99, 'https://i.ibb.co/Hf0DV8fW/992807cc-7e36-4a99-9df2-d227c46b1e1d-removalai-preview.png'),
('Mocha', 'Hot', 'A heavenly mix of rich chocolate and espresso, topped with frothy milk.', 32.50, 'https://i.ibb.co/B25HT0b0/d7734687-e7a4-4cd9-ba62-7cd6e8247d9d-removalai-preview.png'),
('Macchiato', 'Hot', 'A sharp espresso kissed with a dollop of milk foam — short, sweet, and to the point.', 29.99, 'https://i.ibb.co/0jmKqnHQ/400b7aec-8b22-40d5-8410-75e32834563b-removalai-preview.png'),
('Espresso', 'Hot', 'A strong and aromatic single-shot espresso — pure coffee energy.', 23.00, 'https://i.ibb.co/Q70QYyPg/6b86558f-f578-4299-a08e-38b51943914b-removalai-preview.png'),
('Caramel Latte', 'Hot', 'Silky smooth latte sweetened with golden caramel and topped with a creamy swirl.', 36.00, 'https://i.ibb.co/qFDb0X0t/bb8d947d-f1f2-4aca-9f7e-4eaff0b3e1fc-removalai-preview.png'),
('Americano', 'Hot', 'Espresso diluted with hot water — simple, bold, and beautifully smooth.', 26.50, 'https://i.ibb.co/N6JwgCkq/d3a9f97b-9938-4f93-88cf-da474966578a-removalai-preview.png'),
('Cappuccino', 'Hot', 'Classic coffee with equal parts espresso, steamed milk, and frothy foam — a crowd favourite.', 30.00, 'https://i.ibb.co/vvxffJ66/6cc004bc-a80c-4c70-9b55-d70f33783acd-removalai-preview.png'),
('Flat White', 'Hot', 'A velvety blend of espresso and microfoam — smooth, creamy, and bold.', 28.99, 'https://i.ibb.co/FqCTbSFR/15651ffa-baec-4b11-8acf-901d8a9a0f88-removalai-preview.png'),
('Rooibos', 'Hot', 'Naturally caffeine-free herbal tea from the Cederberg — earthy, soothing, and proudly South African.', 24.00, 'https://i.ibb.co/1J8QcB51/1c703dd2-da26-44fc-ad68-3848bfcda343-removalai-preview.png'),
('Green Tea', 'Hot', 'A light, refreshing brew packed with antioxidants — pure zen in a cup.', 25.50, 'https://i.ibb.co/PsQTyb9h/b106975d-6e82-485b-8069-4dff5293754d-removalai-preview.png'),
('Ice Tea', 'Cold', 'Chilled brewed tea served over ice — refreshing and subtly sweet.', 26.00, 'https://i.ibb.co/nsjrGVXp/6277187e-d62f-4554-93ca-36f7d51bb686-removalai-preview.png'),
('Coca-Cola', 'Cold', 'The classic fizzy favourite — ice cold and bubbly for instant refreshment.', 23.00, 'https://i.ibb.co/vCmcNmkh/3987aec1-a4f3-4020-bf5f-1ea162e32a21-removalai-preview.png'),
('Still Water', 'Cold', 'Crystal clear, perfectly chilled bottled water — hydration done right.', 18.50, 'https://i.ibb.co/Nd3vhQLp/cf18867e-3763-4222-bc5f-72a811a9733b-removalai-preview.png'),
('Vanilla Iced Delight', 'Cold', 'Creamy vanilla iced coffee topped with whipped cream — sweet, smooth, and cool.', 34.00, 'https://i.ibb.co/0RB1VpY2/a504aecb-324d-4c05-8369-712021f37b54-removalai-preview.png'),
('Iced Coffee', 'Cold', 'Freshly brewed coffee served over ice — strong, chilled, and invigorating.', 30.00, 'https://i.ibb.co/ynGm72nx/0dc6c5f6-ef9b-41f4-9f6e-0eaf71dc7b6c-removalai-preview.png'),
('Chocolate Muffin', 'Snack', 'Moist and fluffy muffin packed with gooey chocolate chips.', 22.00, 'https://i.ibb.co/PvTpNqYz/a2ef948e-3140-485e-9845-408bd26ec226-removalai-preview.png'),
('Bran Muffin', 'Snack', 'A hearty muffin full of wholesome bran goodness — a healthier bite.', 20.00, 'https://i.ibb.co/PZmT57QH/03fb62d4-d07c-40af-8508-e8b28a328bcd-removalai-preview.png'),
('Pancakes', 'Snack', 'Fluffy pancakes served warm — perfect with syrup or fresh fruit.', 25.00, 'https://i.ibb.co/JFGqVc3Q/bedf3754-a597-4013-a8c8-d1ebd8dfda4e-removalai-preview.png'),
('Croissants', 'Snack', 'Golden, buttery croissants with a crisp outside and airy middle.', 23.50, 'https://i.ibb.co/Rkyc9vKP/74c70ea5-0f78-40c7-bed2-b4666a8a0f45-removalai-preview.png'),
('Cake', 'Snack', 'A generous slice of rich, moist cake — the perfect sweet treat.', 24.99, 'https://i.ibb.co/xSfXTnst/f026b34b-9787-42cd-8b49-fb2880b66559-removalai-preview.png'),
('Toast', 'Snack', 'Crispy, golden-brown toast — a simple yet satisfying choice.', 18.00, 'https://i.ibb.co/q3jzqxrj/Gouden-toast-met-botter.png'),
('Ham Sandwich', 'Snack', 'Classic ham sandwich layered with cheese and crisp lettuce on fresh bread.', 25.00, 'https://i.ibb.co/Xk4R1pYV/4460586d-acc1-41da-b4fc-ecdbc6ba0dbb-removalai-preview.png'),
('Strawberry Frappe', 'Cold', 'Creamy strawberry blended drink with whipped cream on top — sweet and icy.', 35.00, 'https://i.ibb.co/GQ4q34Cp/73fe2ba7-dd62-401b-a5a7-edad7b037624-removalai-preview.png'),
('Cold Brew Coffee', 'Cold', 'Slow-steeped coffee served cold — smooth, strong, and slightly sweet.', 30.00, 'https://i.ibb.co/ynz3bVTY/42546a4c-625b-4073-b07d-0f0746857408-removalai-preview.png'),
('Sparkling Water', 'Cold', 'Lightly carbonated and ultra-refreshing — simple and sophisticated.', 20.00, 'https://i.ibb.co/ZzVL0Cw/sparkling-water.png'),
('Mango Smoothie', 'Cold', 'Fresh mango blended with yoghurt and ice — tropical and refreshing.', 38.00, 'https://i.ibb.co/5hNL00Rt/5519fec3-49db-4fda-95d3-f2ae876d0f35-removalai-preview.png'),
('Iced Chai Latte', 'Cold', 'Spiced chai tea with milk served over ice — creamy, sweet, and aromatic.', 33.00, 'https://i.ibb.co/wFTMCv8F/cbcd52fd-4964-400e-b2e9-ba859216bcfb-removalai-preview.png'),
('Blueberry Muffin', 'Snack', 'Bursting with blueberries and a soft, fluffy centre — a fruity favourite.', 22.00, 'https://i.ibb.co/yFjCWpzJ/8cb1686a-ec09-42ad-a5b9-7d6eebf84302-removalai-preview.png'),
('Cheese Toastie', 'Snack', 'Golden grilled toast filled with melted cheese — gooey and comforting.', 24.00, 'https://i.ibb.co/RkyhL2ft/a9baae43-d6c6-435f-8fd3-d4f9ba88973e-removalai-preview.png'),
('Mini Quiche', 'Snack', 'Buttery crust with a savoury egg and cheese filling — perfect on the go.', 25.00, 'https://i.ibb.co/7JB4PDJ2/da79095d-0890-4339-a727-47b4cb454fd2-removalai-preview.png'),
('Chocolate Brownie', 'Snack', 'Rich and fudgy chocolate brownie — dense, moist, and indulgent.', 24.99, 'https://i.ibb.co/3zYZGGN/chocolate-brownie.png'),
('Fruit Cup', 'Snack', 'A medley of fresh seasonal fruits — light, juicy, and refreshing.', 20.00, 'https://i.ibb.co/jkVYWBYn/3772f8f4-e92d-4b7f-b9da-3c90d6db5013-removalai-preview.png');

-- POPULATE STOCK TABLE
INSERT INTO Stock (StockName, Available_Stock, Arrival_Date, StockStatus, Unit, SupplierName) VALUES
('Coffee Beans', 25, '2025-05-25', 'Available', 'Kg', 'Bean Bros Supplies'),
('Espresso Grounds', 10, '2025-05-24', 'Available', 'Kg', 'Bean Bros Supplies'),
('Milk', 40, '2025-05-26', 'Available', 'L', 'Cape Dairy Co.'),
('Cream', 15, '2025-05-24', 'Low', 'L', 'Cape Dairy Co.'),
('Chocolate Syrup', 12, '2025-05-23', 'Available', 'Kg', 'SweetCraft Ingredients'),
('Caramel Syrup', 8, '2025-05-22', 'Low', 'Kg', 'SweetCraft Ingredients'),
('Green Tea Leaves', 6, '2025-05-21', 'Available', 'Kg', 'Leaf & Co.'),
('Rooibos Tea Leaves', 7, '2025-05-22', 'Available', 'Kg', 'Leaf & Co.'),
('Vanilla Flavouring', 5, '2025-05-20', 'Low', 'L', 'SweetCraft Ingredients'),
('Ice Cubes', 100, '2025-05-27', 'Available', 'Kg', 'Frosty Supply Co.'),
('Bottled Water', 60, '2025-05-26', 'Available', 'L', 'ClearWater Co.'),
('Coca-Cola Bottles', 40, '2025-05-23', 'Available', 'L', 'Coca-Cola Beverages SA'),
('Muffins (Mixed)', 35, '2025-05-25', 'Available', 'Units', 'Bakery on Main'),
('Pancake Mix', 10, '2025-05-20', 'Low', 'Kg', 'Bakery on Main'),
('Croissants', 20, '2025-05-25', 'Available', 'Units', 'Bakery on Main'),
('Cake Slices', 15, '2025-05-21', 'Low', 'Units', 'Bakery on Main'),
('Toast Bread', 25, '2025-05-26', 'Available', 'Units', 'Bakery on Main'),
('Ham Slices', 12, '2025-05-24', 'Low', 'Kg', 'DeliPro Meats'),
('Cheese Blocks', 10, '2025-05-22', 'Low', 'Kg', 'Cape Dairy Co.'),
('Eggs', 50, '2025-05-26', 'Available', 'Units', 'Happy Hens Farm'),
('Strawberries (Frozen)', 8, '2025-05-23', 'Available', 'Kg', 'FruitWorks Distributors'),
('Mango Pulp', 6, '2025-05-21', 'Low', 'Kg', 'FruitWorks Distributors'),
('Chai Tea Mix', 4, '2025-05-20', 'Low', 'Kg', 'Leaf & Co.'),
('Brownie Mix', 7, '2025-05-22', 'Low', 'Kg', 'SweetCraft Ingredients'),
('Fresh Fruits (Mixed)', 10, '2025-05-26', 'Available', 'Kg', 'FruitWorks Distributors'),
('Quiche Filling Mix', 5, '2025-05-21', 'Low', 'Kg', 'DeliPro Meats');


SELECT * FROM Users
SELECT * FROM UserAuth
SELECT * FROM Customers
SELECT * FROM Menu
SELECT * FROM Stockl
SELECT * FROM Orders
SELECT * FROM Payments
SELECT * FROM CardDetails
SELECT * FROM TableReservations
SELECT * FROM Reviews
SELECT * FROM Deliveries
SELECT * FROM AuditLogs
Drop database CoffeeShopDB

-- Disable foreign key constraints
EXEC sp_MSForEachTable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL';
-- Delete all data
EXEC sp_MSForEachTable 'DELETE FROM ?';
-- Re-enable foreign key constraints
EXEC sp_MSForEachTable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL';
-- Reset all auto-increments
EXEC sp_MSForEachTable 'DBCC CHECKIDENT(''?'', RESEED, 0)';
