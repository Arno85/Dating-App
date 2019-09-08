using DatingApp.API.Data.AppRepo;
using DatingApp.API.Helpers;
using DatingApp.API.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data.UsersRepository
{
    public interface IUsersRepository : IAppRepository
    {
        Task<PagedList<User>> GetUsers(UserParams userParams);

        Task<User> GetUser(int id);
    }
}
