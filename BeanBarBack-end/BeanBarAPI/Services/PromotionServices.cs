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
            var customers = await _context.Users.ToListAsync();

            foreach (var customer in customers)
            {
                var lastPromo = await _context.PromotionHistory
                    .Where(p => p.CustomerID == customer.CustomerID)
                    .OrderByDescending(p => p.PromotionDate)
                    .FirstOrDefaultAsync();

                if (lastPromo == null || (DateTime.Now - lastPromo.PromotionDate).TotalDays >= 30)
                {
                    var latestRefreshTokenId = await GetLatestRefreshTokenId(customer.CustomerID);

                    if (latestRefreshTokenId.HasValue)
                    {
                        var promotion = new PromotionHistory
                        {
                            CustomerID = customer.CustomerID,
                            RefreshTokenID = latestRefreshTokenId, // ? Use directly as int?
                            PromotionType = "Discount",
                            PromotionValue = 20.00m,
                            PromotionDate = DateTime.Now,
                            Notes = "20% off your next order"
                        };

                        _context.PromotionHistory.Add(promotion);
                    }
                }
            }

            await _context.SaveChangesAsync();
        }


        private async Task<int?> GetLatestRefreshTokenId(string customerId)
        {
            return await _context.RefreshTokens
                .Where(t => t.CustomerID == customerId && t.Revoked == null)
                .OrderByDescending(t => t.Created)
                .Select(t => (int?)t.Id)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> PlaceOrderAsync(Order newOrder)
        {
            var promotion = await _context.PromotionHistory
                .Where(p => p.CustomerID == newOrder.CustomerID && !p.Used)
                .OrderByDescending(p => p.PromotionDate)
                .FirstOrDefaultAsync();

            if (promotion != null)
            {
                if (promotion.PromotionType == "Discount")
                {
                    decimal discountAmount = (promotion.PromotionValue / 100m) * newOrder.TotalPrice;
                    newOrder.TotalPrice -= discountAmount;
                }
                else if (promotion.PromotionType == "FreeItem")
                {
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

                promotion.Used = true;
            }

            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<PromotionHistory>> GetActivePromotions(string customerId)
        {
            return await _context.PromotionHistory
                .Where(p => p.CustomerID == customerId && !p.Used)
                .ToListAsync();
        }
    }
}
