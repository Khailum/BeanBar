using Microsoft.AspNetCore.Http;
using System.Collections.Concurrent;
using System.Net;
using System.Threading.Tasks;

namespace BeanBarAPI.Middleware
{
    public class IpRateLimitingMiddleware
    {
        private readonly RequestDelegate _next;

        // Tracks requests per IP
        private static readonly ConcurrentDictionary<string, List<DateTime>> _ipRequests = new();

        // Limit configuration
        private const int REQUEST_LIMIT = 5; // e.g., 5 requests
        private static readonly TimeSpan TIME_WINDOW = TimeSpan.FromMinutes(1);

        public IpRateLimitingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var ipAddress = context.Connection.RemoteIpAddress?.ToString();
            var tooManyRequests = false;

            if (!string.IsNullOrEmpty(ipAddress))
            {
                var now = DateTime.UtcNow;
                var requests = _ipRequests.GetOrAdd(ipAddress, new List<DateTime>());

                lock (requests)
                {
                    // Remove old timestamps
                    requests.RemoveAll(t => t < now - TIME_WINDOW);

                    if (requests.Count >= REQUEST_LIMIT)
                    {
                        tooManyRequests = true;
                    }
                    else
                    {
                        requests.Add(now);
                    }
                }
            }

            if (tooManyRequests)
            {
                context.Response.StatusCode = (int)HttpStatusCode.TooManyRequests;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync("{\"message\":\"Too many requests. Try again later.\"}");
                return;
            }

            await _next(context);
        }

    }
}