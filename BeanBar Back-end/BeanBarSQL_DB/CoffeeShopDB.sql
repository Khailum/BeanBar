use CoffeeShopDB

-- ROLES TABLE
CREATE TABLE Roles (
Email VARCHAR(255) PRIMARY KEY,
Username VARCHAR(100) NOT NULL,
UserPassword VARCHAR(255) NOT NULL,
UserRole VARCHAR(50) CHECK (UserRole IN ('Admin', 'Customer')) NOT NULL
);

-- CUSTOMERS TABLE
CREATE TABLE Customers (
IDNumber VARCHAR(13) PRIMARY KEY NOT NULL,
FirstName VARCHAR(100) NOT NULL,
LastName VARCHAR(100) NOT NULL,
Email VARCHAR(255),
PhoneNumber VARCHAR(20) NOT NULL,
Address VARCHAR(255),
FOREIGN KEY (Email) REFERENCES Roles(Email)
);

-- ADMIN TABLE
CREATE TABLE Admin (
AdminID INT PRIMARY KEY,
FirstName VARCHAR(100) NOT NULL,
LastName VARCHAR(100) NOT NULL,
Email VARCHAR(255),
PhoneNumber VARCHAR(20) NOT NULL,
Address VARCHAR(255),
FOREIGN KEY (Email) REFERENCES Roles(Email)
);

-- MENU TABLE
CREATE TABLE Menu (
ItemID INT IDENTITY(1,1) PRIMARY KEY,
ItemName VARCHAR(100) NOT NULL,
ItemType VARCHAR(50) CHECK (ItemType IN ('Hot', 'Cold', 'Snack')) NOT NULL,
ItemDescription VARCHAR (300),
Price DECIMAL(10,2) NOT NULL,
ImageUrl VARCHAR(255)
);

INSERT INTO Menu VALUES 
('Mocha', 'Hot','Delicious mocha coffee.', 21.99, 'https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png' ),
('Iced Coffee', 'Cold','Chilled iced coffee.', 21.99, 'https://i.ibb.co/0y4GJp59/pngtree-iced-coffee-with-removebg-preview.png' ),
('Espresso', 'Hot','Strong espresso shot.', 21.99, 'https://i.ibb.co/LzB0thH7/expresso-removebg-preview.png' ),
('Caramel Latte', 'Hot','Caramel latte with cream.', 21.99, 'https://i.ibb.co/27BcnmbC/a-delicious-caramel-latte-topped-with-whipped-cream-removebg-preview.png' ),
('Vanilla Iced Delight', 'Cold','Vanilla iced delight.', 21.99, 'https://i.ibb.co/27jX7rTX/360-F-609874629-v2i98jy-RXv-HTf-Wtn-B67-P4-Za-VIVbnsox-T-removebg-preview.png' );

-- STOCK TABLE
CREATE TABLE Stock (
StockNum INT IDENTITY(1,1) PRIMARY KEY,
ItemID INT NOT NULL,
Available_Stock INT NOT NULL,
Arrival_Date DATE NOT NULL,
FOREIGN KEY (ItemID) REFERENCES Menu(ItemID)
);

-- ORDERS TABLE
CREATE TABLE Orders (
OrderNum INT IDENTITY(100,1) PRIMARY KEY,
ItemID INT NOT NULL,
IDNumber VARCHAR(13) NOT NULL,
Address VARCHAR(255) NOT NULL,
Date DATE NOT NULL,
OrderType VARCHAR(50) CHECK (OrderType IN ('EatIn', 'Takeout')) NOT NULL,
Quantity INT NOT NULL,
FOREIGN KEY (ItemID) REFERENCES Menu(ItemID),
FOREIGN KEY (IDNumber) REFERENCES Customers(IDNumber)
);

-- CARD DETAILS TABLE
CREATE TABLE CardDetails (
AccountNumber VARCHAR(30) PRIMARY KEY NOT NULL,
Accountholder VARCHAR(100) NOT NULL,
AccountType VARCHAR(50) NOT NULL,
CardNumber VARCHAR(20) NOT NULL,
CVV VARCHAR(4) NOT NULL,
ExpiryDate DATE NOT NULL,
IDNumber VARCHAR(13),
FOREIGN KEY (IDNumber) REFERENCES Customers(IDNumber)
);

-- TABLES (DINING TABLES) TABLE
CREATE TABLE TableReservations (
TableNum INT PRIMARY KEY,
ReservationDate DATE NOT NULL,
ReservationTime TIME NOT NULL,
PartySize INT NOT NULL,
IDNumber VARCHAR(13) NOT NULL,
CustomerName NVARCHAR (90),
FOREIGN KEY (IDNumber) REFERENCES Customers(IDNumber)
);

Select * From Roles
Select * From Customers
Select * From Admin
Select * From Menu
Select * From Stock
Select * From Orders
Select * From CardDetails
Select * From Tables

-- Disable foreign key constraints
EXEC sp_MSForEachTable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL';
-- Delete all data
EXEC sp_MSForEachTable 'DELETE FROM ?';
-- Re-enable foreign key constraints
EXEC sp_MSForEachTable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL';
-- Reset all auto-increments
EXEC sp_MSForEachTable 'DBCC CHECKIDENT(''?'', RESEED, 0)';
