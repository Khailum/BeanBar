

using BeanBarAPI.Services;

using BeanBarAPI.Models;

using BeanBarAPI.Data;

using BeanBarAPI.Interfaces;

using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Authentication.JwtBearer;

using Microsoft.IdentityModel.Tokens;

using Microsoft.AspNetCore.Diagnostics;

using Microsoft.Extensions.Logging;

using System.Text;

using System.Text.Json.Serialization;
 
namespace BeanBar_Back_end

{

    public class Program

    {

        public static void Main(string[] args)

        {

            var builder = WebApplication.CreateBuilder(args);

            // ------------------------------

            // Logging

            // ------------------------------

            builder.Logging.ClearProviders();

            builder.Logging.AddConsole();

            // ------------------------------

            // Database

            // ------------------------------

            builder.Services.AddDbContext<CoffeeDBcontext>(options =>

                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // ------------------------------

            // Configuration Sections

            // ------------------------------

            var emailSettingsSection = builder.Configuration.GetSection("EmailSettings");

            var jwtSettingsSection = builder.Configuration.GetSection("JwtSettings");

            builder.Services.Configure<EmailSettings>(emailSettingsSection);

            builder.Services.Configure<JwtSettings>(jwtSettingsSection);

            // ------------------------------

            // Application Services

            // ------------------------------

            builder.Services.AddScoped<IAuthService, AuthService>();

            builder.Services.AddScoped<IPasswordService, PasswordService>();

            builder.Services.AddScoped<IJwtService, JwtService>();

            builder.Services.AddScoped<IIDValidationService, IDValidationService>();

            builder.Services.AddScoped<IEmailService, EmailService>();

            builder.Services.AddScoped<IAdminService, AdminService>();

            // ------------------------------

            // Controllers with JSON Config

            // ------------------------------

            builder.Services.AddControllers()

                .AddJsonOptions(x =>

                    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

            // ------------------------------

            // Swagger (for development)

            // ------------------------------

            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddSwaggerGen();

            // ------------------------------

            // CORS Policy

            // ------------------------------

            builder.Services.AddCors(options =>

            {

                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy.WithOrigins("http://localhost:5174") // 👈 or 3000 or your frontend port
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials(); // Optional: only if you use cookies or session auth
                });

            });

            // ------------------------------

            // JWT Authentication

            // ------------------------------

            var jwtSecret = jwtSettingsSection["SecretKey"];

            if (string.IsNullOrWhiteSpace(jwtSecret))

                throw new Exception("JWT Secret Key is missing from configuration.");

            var key = Encoding.ASCII.GetBytes(jwtSecret);

            builder.Services.AddAuthentication(options =>

            {

                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            })

            .AddJwtBearer(options =>

            {

                options.RequireHttpsMetadata = true;

                options.SaveToken = true;

                options.TokenValidationParameters = new TokenValidationParameters

                {

                    ValidateIssuerSigningKey = true,

                    IssuerSigningKey = new SymmetricSecurityKey(key),

                    ValidateIssuer = false,

                    ValidateAudience = false,

                    ClockSkew = TimeSpan.Zero

                };

            });

            // ------------------------------

            // Build Application

            // ------------------------------

            var app = builder.Build();

            // ------------------------------

            // Exception Handling

            // ------------------------------

            if (app.Environment.IsDevelopment())

            {

                app.UseDeveloperExceptionPage();

                app.UseSwagger();

                app.UseSwaggerUI();

            }

            else

            {

                app.UseExceptionHandler("/error"); // Optional: centralized error handling

            }

            // ------------------------------

            // Middleware Pipeline

            // ------------------------------

            app.UseHttpsRedirection();

            app.UseCors("AllowFrontend");

            app.UseMiddleware<BeanBarAPI.Middleware.IpRateLimitingMiddleware>();

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            // ------------------------------

            // Run Application

            // ------------------------------

            app.Run();

        }

    }

}

