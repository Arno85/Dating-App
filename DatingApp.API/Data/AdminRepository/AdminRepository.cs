using DatingApp.API.Models.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data.AdminRepository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly DataContext _context;

        public AdminRepository(DataContext context)
        {
            this._context = context;
        }

        public async Task<IEnumerable<User>> GetUsersWithRoles()
        {
            return await this._context.Users
                .Include(u => u.UserRoles)
                .OrderBy(u => u.UserName)
                .ToListAsync();
        }

        public async Task<IEnumerable<Role>> GetRoles()
        {
            return await this._context.Roles.ToListAsync();
        }

        public async Task<IEnumerable<Photo>> GetPhotosForModeration()
        {
            return await _context.Photos
                .Where(p => !p.IsApproved)
                .ToListAsync();
        }

    }
}
