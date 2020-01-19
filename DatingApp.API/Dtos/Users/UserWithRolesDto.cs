using DatingApp.API.Models.Users;
using System.Collections.Generic;

namespace DatingApp.API.Dtos.Users
{
    public class UserWithRolesDto
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public ICollection<string> Roles { get; set; }

        public UserWithRolesDto()
        {
            this.Roles = new List<string>();
        }
    }
}
