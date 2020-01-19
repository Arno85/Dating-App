using DatingApp.API.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data.AdminRepository
{
    public interface IAdminRepository
    {
        Task<IEnumerable<User>> GetUsersWithRoles();

        Task<IEnumerable<Role>> GetRoles();

        Task<IEnumerable<Photo>> GetPhotosForModeration();
    }
}
