using DatingApp.API.Data.AppRepo;
using DatingApp.API.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data.UsersRepository
{
    public interface IUsersRepository : IAppRepository
    {
        Task<IEnumerable<User>> GetUsers();

        Task<User> GetUser(int id);
    }
}
