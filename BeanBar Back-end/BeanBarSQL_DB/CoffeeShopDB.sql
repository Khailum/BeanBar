CREATE DATABASE CoffeeShopDB
USE CoffeeShopDB

-- USERS TABLE (renamed from Roles)
CREATE TABLE Users (
    Email VARCHAR(255) PRIMARY KEY,
    Username VARCHAR(100) NOT NULL,
    UserRole VARCHAR(50) CHECK (UserRole IN ('Admin', 'Customer')) NOT NULL
);

-- AUTHENTICATION DETAILS (separated for security)
CREATE TABLE UserAuth (
    Email VARCHAR(255) PRIMARY KEY,
    HashedPassword VARCHAR(255) NOT NULL,
    Salt VARCHAR(255) NOT NULL,
    FOREIGN KEY (Email) REFERENCES Users(Email)
);

-- CUSTOMERS TABLE
CREATE TABLE Customers (
    CustomerID VARCHAR(15) PRIMARY KEY NOT NULL,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(20) NOT NULL,
    Address VARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (Email) REFERENCES Users(Email)
);

-- MENU TABLE
CREATE TABLE Menu (
    ItemID INT IDENTITY(1,1) PRIMARY KEY,
    ItemName VARCHAR(100) NOT NULL,
    Category VARCHAR(50),
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
    ItemID INT NOT NULL,
    Available_Stock INT NOT NULL,
    Arrival_Date DATE NOT NULL,
    StockStatus VARCHAR(50) CHECK (StockStatus IN ('Available', 'Low', 'Out of Stock')),
    Unit VARCHAR(50) DEFAULT 'Kg',
    SupplierName VARCHAR(100),
    FOREIGN KEY (ItemID) REFERENCES Menu(ItemID)
);

-- ORDERS TABLE
CREATE TABLE Orders (
OrderNum INT IDENTITY(100,1) PRIMARY KEY,
ItemID INT NOT NULL,
CustomerID VARCHAR(15) NOT NULL,
Address VARCHAR(255) NOT NULL,
Date DATE NOT NULL,
OrderType VARCHAR(50) CHECK (OrderType IN ('EatIn', 'Takeout')) NOT NULL,
Quantity INT NOT NULL,
OrderStatus VARCHAR(50) CHECK (OrderStatus IN ('Pending', 'Completed', 'Cancelled')) DEFAULT 'Pending',
TotalPrice DECIMAL(10,2),
FOREIGN KEY (ItemID) REFERENCES Menu(ItemID),
FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
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
CardNumber VARCHAR(20) NOT NULL, -- ENCRYPT or use dummy
CVV VARCHAR(4) NOT NULL,         -- ENCRYPT or use dummy
ExpiryDate DATE NOT NULL,
IsEncrypted BIT DEFAULT 0,
CustomerID VARCHAR(15) NOT NULL,
FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- TABLES (DINING TABLES) TABLE
CREATE TABLE TableReservations (
TableNum INT PRIMARY KEY,
ReservationDate DATE NOT NULL,
ReservationTime TIME NOT NULL,
PartySize INT NOT NULL,
CustomerID VARCHAR(15) NOT NULL,
CustomerName NVARCHAR (80),
tableStatus VARCHAR(50) CHECK (tableStatus IN ('Booked', 'Seated', 'Cancelled')) DEFAULT 'Booked',
Occasion VARCHAR(100),
Notes VARCHAR(255),
CreatedAt DATETIME DEFAULT GETDATE(),
FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- REVIEWS TABLE
CREATE TABLE Reviews (
ReviewID INT IDENTITY(1,1) PRIMARY KEY,
CustomerID VARCHAR (15) NOT NULL,
ItemID INT NOT NULL,
Rating INT CHECK (Rating BETWEEN 1 AND 5),
Comment VARCHAR(500),
ReviewDate DATETIME DEFAULT GETDATE(),
FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
FOREIGN KEY (ItemID) REFERENCES Menu(ItemID)
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

INSERT INTO Menu (ItemName, Category, ItemType, ItemDescription, Price, ImageUrl) VALUES 
('Mocha','Coffee', 'Hot','Delicious mocha coffee.', 21.99, 'https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png' ),
('Iced Coffee', 'Coffee', 'Cold','Chilled iced coffee.', 21.99, 'https://i.ibb.co/0y4GJp59/pngtree-iced-coffee-with-removebg-preview.png' ),
('Espresso', 'Coffee', 'Hot','Strong espresso shot.', 21.99, 'https://i.ibb.co/LzB0thH7/expresso-removebg-preview.png' ),
('Caramel Latte', 'Coffee', 'Hot','Caramel latte with cream.', 21.99, 'https://i.ibb.co/27BcnmbC/a-delicious-caramel-latte-topped-with-whipped-cream-removebg-preview.png' ),
('Vanilla Iced Delight', 'Coffee', 'Cold','Vanilla iced delight.', 21.99, 'https://i.ibb.co/27jX7rTX/360-F-609874629-v2i98jy-RXv-HTf-Wtn-B67-P4-Za-VIVbnsox-T-removebg-preview.png' );

SELECT * FROM Users
SELECT * FROM UserAuth
SELECT * FROM Customers
SELECT * FROM Menu
SELECT * FROM Stock
SELECT * FROM Orders
SELECT * FROM Payments
SELECT * FROM CardDetails
SELECT * FROM TableReservations
SELECT * FROM Reviews
SELECT * FROM Deliveries
SELECT * FROM AuditLogs

-- Disable foreign key constraints
EXEC sp_MSForEachTable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL';
-- Delete all data
EXEC sp_MSForEachTable 'DELETE FROM ?';
-- Re-enable foreign key constraints
EXEC sp_MSForEachTable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL';
-- Reset all auto-increments
EXEC sp_MSForEachTable 'DBCC CHECKIDENT(''?'', RESEED, 0)';
