using DatingApp.API.Data.AppRepo;
using DatingApp.API.Helpers;
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

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var usersFromDb = _context.Users.Include(p => p.Photos).OrderByDescending(x => x.LastActive).AsQueryable();

            usersFromDb = usersFromDb.Where(u => u.Id != userParams.UserId);
            usersFromDb = usersFromDb.Where(u => u.gender == userParams.Gender);

            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                usersFromDb = usersFromDb.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }

            if(!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        usersFromDb = usersFromDb.OrderByDescending(u => u.Created);
                        break;
                    default:
                        usersFromDb = usersFromDb.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(usersFromDb, userParams.PageNumber, userParams.PageSize);
        }
    }
}
