using DatingApp.API.Data.AppRepo;
using DatingApp.API.Models.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data.UsersRepository
{
    public class UsersRepository : AppRepository, IUsersRepository
    {
        public UsersRepository(DataContext context) : base(context) { }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.Include(p => p.Photos).OrderBy(x => x.Created).ToListAsync();
        }
    }
}
