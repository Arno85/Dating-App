using DatingApp.API.Data;
using DatingApp.API.Data.AdminRepository;
using DatingApp.API.Data.PhotosRepository;
using DatingApp.API.Data.UsersRepository;
using DatingApp.API.Factories.TokenFactory;
using Microsoft.Extensions.DependencyInjection;

namespace DatingApp.API.Modules
{
    public static class RepositoryModule
    {
        public static void ConfigureRepositories(this IServiceCollection services)
        {
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<ITokenFactory, TokenFactory>();
            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddScoped<IPhotosRepository, PhotosRepository>();
            services.AddScoped<IAdminRepository, AdminRepository>();
        }
    }
}
