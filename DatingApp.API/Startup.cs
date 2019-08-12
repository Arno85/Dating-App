using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Data.PhotosRepository;
using DatingApp.API.Data.Seeds;
using DatingApp.API.Data.UsersRepository;
using DatingApp.API.Factories.TokenFactory;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(opt =>
                {
                    opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });
            services.AddDbContext<DataContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
			// Add Cross Origin
			services.AddCors();
            // Add AutoMapper
            services.AddAutoMapper();
            // Add Cloudinary Settings
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            // Seed the database with stub data
            services.AddTransient<Seed>();
            // HttpClient
            services.AddHttpClient();

            // Add the Dependency Injection for the Auth Repository
            /* NOTES -> 3 possibilities :
            - AddSingleton add the dependency injection with a SINGLE instance of the object. Same instance used across the app.
            - AddTransient add the dependency injection. Create an instance each time the service is requested. 
            - AddScoped add the dependency injection with a SINGLE instance like AddSingleton but in the current scope itself. 
            Ex: It will create one instance for each HTTP request but will reuse the same instance within the same web request.
            */
            services.AddScoped<IAuthRepository, AuthRepository>();
			services.AddScoped<ITokenFactory, TokenFactory>();
            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddScoped<IPhotosRepository, PhotosRepository>();

            // Set Authentication
            setAuthentication(services);

			// Set Authorize Attribute to all controllers
			services.AddMvc(o =>
			{
				var policy = new AuthorizationPolicyBuilder()
					.RequireAuthenticatedUser()
					.Build();
				o.Filters.Add(new AuthorizeFilter(policy));
			});
		}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, Seed seeder)
        {
            if (env.IsDevelopment())
            {
                // Populate the database with stub data
                // seeder.SeedUsers();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder => {
                    builder.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if(error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
                //app.UseHsts();
            }

            // app.UseHttpsRedirection();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
			app.UseAuthentication();
			app.UseMvc();
        }

		private void setAuthentication(IServiceCollection services)
		{
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(options =>
				{
					options.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuerSigningKey = true,
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
						ValidateIssuer = false,
						ValidateAudience = false
					};
				});
		}
	}
}
