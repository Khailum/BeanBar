CREATE DATABASE CoffeeShopDB
use CoffeeShopDB
 
-- USERS TABLE (renamed from Roles)
CREATE TABLE Users (
Email VARCHAR(255) PRIMARY KEY, -- Unique login/identifierr
FullName VARCHAR(100),
Password NVARCHAR(200) NOT NULL,
UserRole VARCHAR(50) CHECK (UserRole IN ('Admin', 'Customer')) NOT NULL,
IsActive BIT DEFAULT 1,
CustomerID VARCHAR(13) UNIQUE, -- Still acts as FK in other tables
PhoneNumber VARCHAR(20),
Address VARCHAR(255),
CreatedAt DATETIME DEFAULT GETDATE(),
Token NVARCHAR(500),
DateOfBirth DATETIME,
LastPromotionDate DATETIME,
CONSTRAINT CK_Users_CustomerID_Length CHECK (CustomerID IS NULL OR (LEN(CustomerID) = 13 AND CustomerID NOT LIKE '%[^0-9]%'))
);

-- Admin Details:
INSERT INTO Users (
  Email, FullName, Password, UserRole, IsActive, CustomerID, CreatedAt, Token
) VALUES (
  'beanbar.04@gmail.com',
  'Admin User',
  'cb0483df0263eddd12d6a4ebe30e7b9719ed2ecfb2bcdd9f7a71707735669300', --beanbar@28
  'Admin',
  1,
  '0000000000000',
  GETDATE(),
  'e0af06d458a2d5504327df7f6290be58'
);

-- AUTHENTICATION DETAILS (separated for security)
CREATE TABLE UserAuth (
UsersID INT PRIMARY KEY,
Email VARCHAR(255),
HashedPassword VARCHAR(255) NOT NULL,
Salt VARCHAR(255) NOT NULL,
FOREIGN KEY (Email) REFERENCES Users(Email)
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
FOREIGN KEY (CustomerID) REFERENCES Users(CustomerID) -- Updated FK
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
FOREIGN KEY (CustomerID) REFERENCES Users(CustomerID)
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
FOREIGN KEY (CustomerID) REFERENCES Users(CustomerID)
);
 
-- REVIEWS TABLE
CREATE TABLE Reviews (
ReviewID INT IDENTITY(1,1) PRIMARY KEY,
CustomerID VARCHAR(13) NOT NULL, -- Changed
Rating INT CHECK (Rating BETWEEN 1 AND 5),
Comment VARCHAR(500),
ReviewDate DATETIME DEFAULT GETDATE(),
FOREIGN KEY (CustomerID) REFERENCES Users(CustomerID)
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
Quantity INT NOT NULL,
Price DECIMAL(10,2) NOT NULL,
IsAvailable BIT DEFAULT 1,
ImageUrl VARCHAR(255),
DateAdded DATETIME DEFAULT GETDATE(),
FOREIGN KEY (OrderNum) REFERENCES Orders(OrderNum)
);
ALTER TABLE Cart
ADD DeliveryOption VARCHAR(10) NOT NULL DEFAULT 'instore' 
CHECK (DeliveryOption IN ('instore', 'delivery'));
 
-- JWT SERVICES - REFRESH TOKENS
CREATE TABLE RefreshTokens (
Id INT IDENTITY(1,1) PRIMARY KEY,
Token NVARCHAR(500) NOT NULL,
CustomerID VARCHAR(13) NOT NULL, -- Changed
Expires DATETIME2 NOT NULL,
Created DATETIME2 NOT NULL,
Revoked DATETIME2 NULL,
ReplacedByToken NVARCHAR(500) NULL,
CONSTRAINT FK_RefreshTokens_Customers_CustomerID FOREIGN KEY (CustomerID) REFERENCES Users(CustomerID)
);

CREATE TABLE PromotionHistory (
PromotionID INT IDENTITY(1,1) PRIMARY KEY,
CustomerID VARCHAR(13) NOT NULL,
RefreshTokenID INT NOT NULL,
PromotionType VARCHAR(100), -- e.g., 'Discount', 'Loyalty Points', etc.
PromotionValue DECIMAL(10,2), -- e.g., 10.00 for R10 discount
PromotionDate DATETIME DEFAULT GETDATE(),
Notes VARCHAR(255),
Used BIT DEFAULT 0,
FOREIGN KEY (CustomerID) REFERENCES Users(CustomerID),
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

-- Mock data for Users table based on CustomerIDs used in Orders
INSERT INTO Users (Email, FullName, Password, UserRole, CustomerID, PhoneNumber, Address, DateOfBirth)
VALUES
('john.doe@email.com', 'John Doe', 'hashedpassword1', 'Customer', '9406300244083', '0712345678', '123 Example Street', '1994-06-30'),
('jane.smith@email.com', 'Jane Smith', 'hashedpassword2', 'Customer', '9104090860082', '0723456789', '456 Sample Road', '1991-04-09'),
('michael.brown@email.com', 'Michael Brown', 'hashedpassword3', 'Customer', '8503035277084', '0734567890', '789 Demo Blvd', '1985-03-03'),
('susan.clark@email.com', 'Susan Clark', 'hashedpassword4', 'Customer', '9212255023087', '0745678901', '321 Mock Ave', '1992-12-25'),
('david.lee@email.com', 'David Lee', 'hashedpassword5', 'Customer', '9508120764080', '0756789012', '654 Test Lane', '1995-08-12'),
('laura.miller@email.com', 'Laura Miller', 'hashedpassword6', 'Customer', '9001014800086', '0767890123', '987 Trial St', '1990-01-01'),
('peter.wilson@email.com', 'Peter Wilson', 'hashedpassword7', 'Customer', '8601025804082', '0778901234', '135 Alpha Rd', '1986-01-02'),
('chloe.adams@email.com', 'Chloe Adams', 'hashedpassword8', 'Customer', '9709235115089', '0789012345', '246 Beta Dr', '1997-09-23'),
('daniel.evans@email.com', 'Daniel Evans', 'hashedpassword9', 'Customer', '8807065809084', '0790123456', '369 Gamma Pkwy', '1988-07-06'),
('amy.johnson@email.com', 'Amy Johnson', 'hashedpassword10', 'Customer', '9305180662085', '0801234567', '159 Omega Ct', '1993-05-18');


--MOCK DATA FOR ORDERs TABLE: 
INSERT INTO Orders (ItemID, CustomerID, Address, Date, OrderType, Quantity, OrderStatus, TotalPrice)
VALUES
(1, '9406300244083', '123 Example Street', '2025-06-01', 'Takeout', 2, 'Completed', 100.00),
(2, '9104090860082', '456 Sample Road', '2025-06-01', 'EatIn', 1, 'Completed', 50.00),
(3, '8503035277084', '789 Demo Blvd', '2025-06-02', 'Takeout', 3, 'Pending', 150.00),
(4, '9212255023087', '321 Mock Ave', '2025-06-02', 'EatIn', 1, 'Completed', 75.00),
(5, '9508120764080', '654 Test Lane', '2025-06-03', 'Takeout', 2, 'Cancelled', 90.00),
(6, '9001014800086', '987 Trial St', '2025-06-03', 'EatIn', 2, 'Completed', 120.00),
(7, '8601025804082', '135 Alpha Rd', '2025-06-03', 'Takeout', 4, 'Pending', 200.00),
(8, '9709235115089', '246 Beta Dr', '2025-06-03', 'EatIn', 1, 'Completed', 60.00),
(9, '8807065809084', '369 Gamma Pkwy', '2025-06-03', 'Takeout', 3, 'Completed', 135.00),
(10, '9305180662085', '159 Omega Ct', '2025-06-03', 'EatIn', 2, 'Completed', 110.00);

--INSERT MOCK DATA FOR PAYMENT TABLE: 
INSERT INTO Payments (OrderNum, Amount, PaymentMethod)
VALUES
(101, 100.00, 'Card'),
(102, 50.00, 'Cash'),
(103, 150.00, 'EFT'),
(104, 75.00, 'Card'),
(105, 90.00, 'Cash'),
(106, 120.00, 'EFT'),
(107, 200.00, 'Card'),
(108, 60.00, 'Cash'),
(109, 135.00, 'EFT'),
(110, 110.00, 'Card');

--INSERT MOCK DATA INTO CARDDETAILS:
INSERT INTO CardDetails (
    AccountNumber, Accountholder, AccountType, CardNumber, CVV, ExpiryDate, IsEncrypted, CustomerID
)
VALUES
('ACC1234567890', 'Thabo Mokoena', 'Savings', '4111111111111111', '123', '2027-05-31', 0, '9406300244083'),
('ACC2345678901', 'Zanele Khumalo', 'Current', '5500000000000004', '456', '2026-11-30', 0, '9104090860082'),
('ACC3456789012', 'Mpho Dlamini', 'Savings', '340000000000009', '789', '2028-03-31', 0, '8503035277084'),
('ACC4567890123', 'Lerato Sibanda', 'Savings', '30000000000004', '321', '2029-07-31', 0, '9212255023087'),
('ACC5678901234', 'Tshepo Molefe', 'Current', '6011000000000004', '654', '2027-01-31', 0, '9508120764080'),
('ACC6789012345', 'Nomvula Ngcobo', 'Savings', '3530111333300000', '987', '2026-09-30', 0, '9001014800086'),
('ACC7890123456', 'Kabelo Ndlovu', 'Current', '6304000000000000', '111', '2027-12-31', 0, '8601025804082'),
('ACC8901234567', 'Sipho Mahlangu', 'Savings', '4035500000000000', '222', '2028-08-31', 0, '9709235115089'),
('ACC9012345678', 'Ayanda Zulu', 'Current', '5333333333333333', '333', '2029-02-28', 0, '8807065809084'),
('ACC0123456789', 'Boitumelo Radebe', 'Savings', '2223000048400011', '444', '2030-06-30', 0, '9305180662085');

--INSERT MOCK DATA INTO TABLERESERVATIONS:
INSERT INTO TableReservations (TableNum, ReservationDate, ReservationTime, PartySize, CustomerID, CustomerName, tableStatus, Occasion, Notes)
VALUES
(1, '2025-06-05', '18:30', 4, '9406300244083', 'Thabo Mokoena', 'Booked', 'Birthday', 'Prefers window seat'),
(2, '2025-06-06', '19:00', 2, '9104090860082', 'Zanele Khumalo', 'Seated', 'Anniversary', 'Allergic to nuts'),
(3, '2025-06-07', '12:00', 6, '8503035277084', 'Mpho Dlamini', 'Cancelled', 'Graduation', 'Cancelled due to rain'),
(4, '2025-06-08', '14:30', 3, '9212255023087', 'Lerato Sibanda', 'Booked', 'Family Lunch', 'Has a baby chair request'),
(5, '2025-06-09', '20:00', 5, '9508120764080', 'Tshepo Molefe', 'Booked', 'Reunion', 'Wants a quiet corner'),
(6, '2025-06-10', '13:00', 2, '9001014800086', 'Nomvula Ngcobo', 'Seated', 'Business Lunch', 'Requires power outlet'),
(7, '2025-06-11', '17:00', 8, '8601025804082', 'Kabelo Ndlovu', 'Booked', 'Wedding Rehearsal', 'Will bring decorations'),
(8, '2025-06-12', '11:30', 4, '9709235115089', 'Sipho Mahlangu', 'Booked', 'Brunch', 'Vegetarian options requested'),
(9, '2025-06-13', '19:30', 3, '8807065809084', 'Ayanda Zulu', 'Cancelled', 'Catch-up', 'Cancelled last minute'),
(10, '2025-06-14', '18:00', 6, '9305180662085', 'Boitumelo Radebe', 'Seated', 'Promotion', 'Surprise event');

--INSERT MOCK DETAILS INTO REVIEWS: 
INSERT INTO Reviews (CustomerID, Rating, Comment)
VALUES
('9406300244083', 5, 'Excellent service and delicious food! Will definitely come again.'),
('9104090860082', 4, 'The food was great, but the wait time was a bit long.'),
('8503035277084', 3, 'Average experience. The place was clean but the service could improve.'),
('9212255023087', 5, 'Loved the ambiance and the staff was super friendly!'),
('9508120764080', 2, 'Food was cold and the server forgot our drinks.'),
('9001014800086', 4, 'Good value for money. The specials were a nice surprise.'),
('8601025804082', 5, 'One of the best meals I’ve had in a while. Highly recommend!'),
('9709235115089', 3, 'It was okay. Not bad, but not great either.'),
('8807065809084', 1, 'Terrible experience. Wrong order and poor customer service.'),
('9305180662085', 4, 'Tasty food and great location. Just a bit noisy during lunch hour.');

--INSERT MOCK DETAILS INTO DELIVERIES:
INSERT INTO Deliveries (OrderNum, DeliveryAddress, DeliveryStatus, EstimatedTime)
VALUES
(101, '12 Rosewood Street, Cape Town', 'Delivered', '12:30:00'),
(102, '45 Main Road, Johannesburg', 'On the Way', '13:15:00'),
(103, '89 Sunset Blvd, Durban', 'Preparing', '14:00:00'),
(104, '23 Ocean View Drive, Port Elizabeth', 'Delivered', '11:45:00'),
(105, '7 Long Street, Pretoria', 'On the Way', '13:45:00'),
(106, '17 Kingfisher Ave, Bloemfontein', 'Preparing', '15:00:00'),
(107, '36 Riverside Road, Cape Town', 'Delivered', '12:00:00'),
(108, '52 Garden Lane, East London', 'On the Way', '14:30:00'),
(109, '11 Bluebell Crescent, George', 'Preparing', '15:45:00'),
(110, '29 Forest Hill Drive, Polokwane', 'Delivered', '13:00:00');

INSERT INTO Cart (OrderNum, ItemID, ItemName, ItemType, ItemDescription, Quantity, Price, IsAvailable, ImageUrl, DateAdded)
VALUES
(104, 1, 'Cortado', 'Hot', 'A bold espresso gently mellowed with a splash of warm milk — small but mighty.', 1, 27.99, 1, 'https://i.ibb.co/Hf0DV8fW/992807cc-7e36-4a99-9df2-d227c46b1e1d-removalai-preview.png', GETDATE()),
(105, 2, 'Mocha', 'Hot', 'A heavenly mix of rich chocolate and espresso, topped with frothy milk.', 1, 32.50, 1, 'https://i.ibb.co/B25HT0b0/d7734687-e7a4-4cd9-ba62-7cd6e8247d9d-removalai-preview.png', GETDATE()),
(106, 3, 'Macchiato', 'Hot', 'A sharp espresso kissed with a dollop of milk foam — short, sweet, and to the point.', 1, 29.99, 1, 'https://i.ibb.co/0jmKqnHQ/400b7aec-8b22-40d5-8410-75e32834563b-removalai-preview.png', GETDATE()),
(107, 4, 'Espresso', 'Hot', 'A strong and aromatic single-shot espresso — pure coffee energy.', 1, 23.00, 1, 'https://i.ibb.co/Q70QYyPg/6b86558f-f578-4299-a08e-38b51943914b-removalai-preview.png', GETDATE()),
(108, 5, 'Caramel Latte', 'Hot', 'Silky smooth latte sweetened with golden caramel and topped with a creamy swirl.', 1, 36.00, 1, 'https://i.ibb.co/qFDb0X0t/bb8d947d-f1f2-4aca-9f7e-4eaff0b3e1fc-removalai-preview.png', GETDATE()),
(109, 6, 'Americano', 'Hot', 'Espresso diluted with hot water — simple, bold, and beautifully smooth.', 1, 26.50, 1, 'https://i.ibb.co/N6JwgCkq/d3a9f97b-9938-4f93-88cf-da474966578a-removalai-preview.png', GETDATE()),
(110, 7, 'Cappuccino', 'Hot', 'Classic coffee with equal parts espresso, steamed milk, and frothy foam — a crowd favourite.', 1, 30.00, 1, 'https://i.ibb.co/vvxffJ66/6cc004bc-a80c-4c70-9b55-d70f33783acd-removalai-preview.png', GETDATE()),
(111, 8, 'Flat White', 'Hot', 'A velvety blend of espresso and microfoam — smooth, creamy, and bold.', 1, 28.99, 1, 'https://i.ibb.co/FqCTbSFR/15651ffa-baec-4b11-8acf-901d8a9a0f88-removalai-preview.png', GETDATE());

SELECT * FROM Users
SELECT * FROM Menu
SELECT * FROM Stock
SELECT * FROM Orders
SELECT * FROM Payments
SELECT * FROM CardDetails
SELECT * FROM TableReservations
SELECT * FROM Reviews
SELECT * FROM Deliveries
SELECT * FROM AuditLogs
SELECT * FROM Cart
Drop database CoffeeShopDB

-- Disable foreign key constraints
EXEC sp_MSForEachTable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL';
-- Delete all data
EXEC sp_MSForEachTable 'DELETE FROM ?';
-- Re-enable foreign key constraints
EXEC sp_MSForEachTable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL';
-- Reset all auto-increments
EXEC sp_MSForEachTable 'DBCC CHECKIDENT(''?'', RESEED, 0)';




DELETE FROM Cart;
