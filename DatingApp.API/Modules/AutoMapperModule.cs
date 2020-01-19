using AutoMapper;
using DatingApp.API.Dtos.Auth;
using DatingApp.API.Dtos.Photos;
using DatingApp.API.Dtos.Users;
using DatingApp.API.Helpers;
using DatingApp.API.Models.Messages;
using DatingApp.API.Models.Users;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace DatingApp.API.Modules
{
    public static class AutoMapperModule
    {
        public static MapperConfiguration config { get; set; }

        public static MapperConfiguration ConfigureMapper()
        {
            return config = new MapperConfiguration(cfg =>
            {
                // Users
                cfg.CreateMap<UserForUpdateDto, User>();
                cfg.CreateMap<User, UsersListDto>()
                    .ForMember(dest => dest.PhotoUrl, opt =>
                    {
                        opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                    })
                    .ForMember(dest => dest.Age, opt =>
                    {
                        opt.MapFrom(src => src.DateOfBirth.CalculateAge());
                    });
                cfg.CreateMap<User, UserForDetailDto>()
                    .ForMember(dest => dest.PhotoUrl, opt =>
                    {
                        opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                    })
                    .ForMember(dest => dest.Age, opt =>
                    {
                        opt.MapFrom(src => src.DateOfBirth.CalculateAge());
                    });
                cfg.CreateMap<UserForRegisterDto, User>();
                cfg.CreateMap<User, UserWithRolesDto>()
                    .ForMember(dest => dest.Roles, opt =>
                    {
                        opt.MapFrom(src => src.UserRoles.Select(ur => ur.Role.Name));
                    });

                // Photos
                cfg.CreateMap<Photo, PhotoForDetailDto>();
                cfg.CreateMap<Photo, PhotoForReturnDto>();
                cfg.CreateMap<PhotoForCreationDto, Photo>();

                // Messages
                cfg.CreateMap<MessageForCreationDto, Message>().ReverseMap();
                cfg.CreateMap<Message, MessageToReturnDto>()
                    .ForMember(dest => dest.SenderPhotoUrl, opt => {
                        opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url);
                    })
                    .ForMember(dest => dest.RecipientPhotoUrl, opt => {
                        opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url);
                    });
            });
        }

        public static void ConfigureAutoMapper(this IServiceCollection services)
        {
            ConfigureMapper();

            services.AddSingleton(config.CreateMapper());
            services.AddAutoMapper(typeof(Startup));
        }
    }
}
