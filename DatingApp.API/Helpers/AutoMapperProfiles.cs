using AutoMapper;
using DatingApp.API.Dtos.Auth;
using DatingApp.API.Dtos.Photos;
using DatingApp.API.Dtos.Users;
using DatingApp.API.Models.Users;
using System.Linq;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Users
            CreateMap<UserForUpdateDto, User>();
            CreateMap<User, UsersListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => setPhotoUrl(src));
                })
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => setPhotoUrl(src));
                })
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge());
                });
            CreateMap<UserForRegisterDto, User>();

            // Photos
            CreateMap<Photo, PhotoForDetailDto>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
        }

        private string setPhotoUrl(User user)
        {
            var mainPhoto = user.Photos.FirstOrDefault(p => p.IsMain);

            if(mainPhoto != null)
            {
                return mainPhoto.Url;
            }

            return "../assets/img/user.png";
        }
    }
}
