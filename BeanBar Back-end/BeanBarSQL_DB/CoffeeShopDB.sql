CREATE DATABASE CoffeeShopDB
use CoffeeShopDB
 
-- USERS TABLE (renamed from Roles)
CREATE TABLE Users (
Email VARCHAR(255) PRIMARY KEY,
Username VARCHAR(100) NOT NULL,
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
FulltName VARCHAR(100) NOT NULL,
Email VARCHAR(255) NOT NULL,
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
 
-- INSERT MENU ITEMS WITH UPDATED ZAR PRICES
INSERT INTO Menu (ItemName, ItemType, ItemDescription, Price, ImageUrl) VALUES
('Cortado', 'Hot', 'Delicious mocha coffee.', 27.99, 'https://i.ibb.co/G4Zt2Tvy/c-removebg-preview.png'),
('Mocha', 'Hot', 'Delicious mocha coffee.', 32.50, 'https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png'),
('Macchiato', 'Hot', 'Delicious mocha coffee.', 29.99, 'https://i.ibb.co/BVy3pVGh/latte-macchiato-rezept-zubereitung-glas-removebg-preview.png'),
('Espresso', 'Hot', 'Strong espresso shot.', 23.00, 'https://i.ibb.co/LzB0thH7/expresso-removebg-preview.png'),
('Caramel Latte', 'Hot', 'Caramel latte with cream.', 36.00, 'https://i.ibb.co/27BcnmbC/a-delicious-caramel-latte-topped-with-whipped-cream-removebg-preview.png'),
('Americano', 'Hot', 'Americano coffee.', 26.50, 'https://i.ibb.co/JR97Z6WW/americano-removebg-preview.png'),
('Cappuccino', 'Hot', 'Rich cappuccino.', 30.00, 'https://i.ibb.co/W4DWG1Z9/pngtree-delicious-cappuccino-coffee-cup-png-image-14700921-removebg-preview.png'),
('Flat White', 'Hot', 'Smooth flat white.', 28.99, 'https://i.ibb.co/LD1tzCmc/flatwhite-removebg-preview.png'),
('Rooibos', 'Hot', 'South African Rooibos tea.', 24.00, 'https://i.ibb.co/Kx3WdSNh/Getty-Images-693893647-588d21e413dd411cb1f2b0a0ea3e02da-removebg-preview.png'),
('Green Tea', 'Hot', 'Refreshing green tea.', 25.50, 'https://i.ibb.co/hJp72B11/green-tea-removebg-preview.png'),
('Ice Tea', 'Cold', 'Cold brewed ice tea.', 26.00, 'https://i.ibb.co/PswcJJwx/ice-tea-removebg-preview.png'),
('Coca-Cola', 'Cold', 'Classic Coca-Cola.', 23.00, 'https://i.ibb.co/Fq0gKQNx/coke-removebg-preview.png'),
('Still Water', 'Cold', 'Pure still water.', 18.50, 'https://i.ibb.co/sJygJ9wY/water-removebg-preview.png'),
('Vanilla Iced Delight', 'Cold', 'Vanilla iced delight.', 34.00, 'https://i.ibb.co/27jX7rTX/360-F-609874629-v2i98jy-RXv-HTf-Wtn-B67-P4-Za-VIVbnsox-T-removebg-preview.png'),
('Iced Coffee', 'Cold', 'Chilled iced coffee.', 30.00, 'https://i.ibb.co/0y4GJp59/pngtree-iced-coffee-with-removebg-preview.png'),
('Chocolate Muffin', 'Snack', 'Chocolate chip muffin.', 22.00, 'https://i.ibb.co/7JpLqW8b/Chocolate-Chip-Muffins-on-a-Plate-removebg-preview.png'),
('Bran Muffin', 'Snack', 'Bran muffin.', 20.00, 'https://i.ibb.co/816xP8T/chocolate-muffins2-removebg-preview.png'),
('Pancakes', 'Snack', 'Stack of pancakes.', 25.00, 'https://i.ibb.co/xtxnGd7p/pancake-removebg-preview.png'),
('Croissants', 'Snack', 'Buttery croissants.', 23.50, 'https://i.ibb.co/v6MpbPTJ/croissant-removebg-preview.png'),
('Cake', 'Snack', 'Slice of cake.', 24.99, 'https://i.ibb.co/XZtTw8g1/cake-removebg-preview.png'),
('Toast', 'Snack', 'Crispy toast.', 18.00, 'https://i.ibb.co/MxHC945j/toat-removebg-preview.png'),
('Ham Sandwich', 'Snack', 'Tasty ham sandwich.', 25.00, 'https://i.ibb.co/JWGRf8c3/Ham-Sandwich-removebg-preview.png'),
('Ham Sandwich', 'Snack', 'Tasty ham sandwich.', 25.00, 'https://i.ibb.co/Kx7hnKc8/item-600000000917076702-1642439553-removebg-preview.png');


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
