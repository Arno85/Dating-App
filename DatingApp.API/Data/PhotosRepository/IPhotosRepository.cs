using DatingApp.API.Data.AppRepo;
using DatingApp.API.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data.PhotosRepository
{
    public interface IPhotosRepository : IAppRepository
    {
        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForUser(int userId);
    }
}
