using DatingApp.API.Data.AppRepo;
using DatingApp.API.Models.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data.PhotosRepository
{
    public class PhotosRepository : AppRepository, IPhotosRepository
    {
        public PhotosRepository(DataContext context) : base(context) { }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos
                .Where(u => u.UserId == userId)
                .FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            return await _context.Photos
                .FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}
