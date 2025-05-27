using BeanBarAPI.Data;
using BeanBarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BeanBarAPI.Services
{
    public class PromotionServices
    {
        private readonly CoffeeDBcontext _context;

        public PromotionServices(CoffeeDBcontext context)
        {
            _context = context;
        }

        public async Task PromoteEligibleCustomersAsync()
        {
            var customers = await _context.Customers.ToListAsync();

            foreach (var customer in customers)
            {
                var lastPromo = await _context.PromotionHistories
                    .Where(p => p.CustomerID == customer.CustomerID)
                    .OrderByDescending(p => p.PromotionDate)
                    .FirstOrDefaultAsync();

                if (lastPromo == null || (DateTime.Now - lastPromo.PromotionDate).TotalDays >= 30)
                {
                    // EXAMPLE 1: Apply a 20% Discount
                    var promotion = new PromotionHistory
                    {
                        CustomerID = customer.CustomerID,
                        RefreshTokenID = await GetLatestRefreshTokenId(customer.CustomerID),
                        PromotionType = "Discount",
                        PromotionValue = 20.00m, 
                        PromotionDate = DateTime.Now,
                        Notes = "10% off your next order"
                    };

                    // EXAMPLE 2: Or give a free item
                    /*
                    var promotion = new PromotionHistory
                    {
                        CustomerID = customer.CustomerID,
                        RefreshTokenID = await GetLatestRefreshTokenId(customer.CustomerID),
                        PromotionType = "FreeItem",
                        PromotionValue = 0,
                        PromotionDate = DateTime.Now,
                        Notes = "Free Cappuccino with your next purchase"
                    };
                    */

                    _context.PromotionHistories.Add(promotion);
                }
            }

            await _context.SaveChangesAsync();
        }

        private async Task<int> GetLatestRefreshTokenId(string customerId)
        {
            return await _context.RefreshTokens
                .Where(t => t.CustomerID == customerId && t.Revoked == null)
                .OrderByDescending(t => t.Created)
                .Select(t => t.Id)
                .FirstOrDefaultAsync();
        }
        public async Task<bool> PlaceOrderAsync(Order newOrder)
        {
            // Get applicable promotion for this customer
            var promotion = await _context.PromotionHistories
                .Where(p => p.CustomerID == newOrder.CustomerID && !p.Used)
                .OrderByDescending(p => p.PromotionDate)
                .FirstOrDefaultAsync();

            if (promotion != null)
            {
                if (promotion.PromotionType == "Discount")
                {
                    // Apply discount
                    decimal discountAmount = (promotion.PromotionValue / 100m) * newOrder.TotalPrice;
                    newOrder.TotalPrice -= discountAmount;
                }
                else if (promotion.PromotionType == "FreeItem")
                {
                    // Assume you fetch an ItemID for the free item (e.g., "Cappuccino")
                    int freeItemId = await _context.Menu
                        .Where(m => m.ItemName == "Cappuccino")
                        .Select(m => m.ItemID)
                        .FirstOrDefaultAsync();

                    if (freeItemId > 0)
                    {
                        var freeOrder = new Order
                        {
                            CustomerID = newOrder.CustomerID,
                            ItemID = freeItemId,
                            Address = newOrder.Address,
                            Date = DateTime.Now,
                            OrderType = newOrder.OrderType,
                            Quantity = 1,
                            OrderStatus = "Pending",
                            TotalPrice = 0
                        };

                        _context.Orders.Add(freeOrder);
                    }
                }

                // Mark promotion as used
                promotion.Used = true;
            }

            // Save the original (possibly discounted) order
            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<List<PromotionHistory>> GetActivePromotions(string customerId)
        {
            return await _context.PromotionHistories
                .Where(p => p.CustomerID == customerId && !p.Used)
                .ToListAsync();
        }



    }

}