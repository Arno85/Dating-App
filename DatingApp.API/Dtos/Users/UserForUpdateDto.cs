using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Dtos.Users
{
    public class UserForUpdateDto
    {
        public DateTime DateOfBirth { get; set; }

        public string KnownAs { get; set; }

        public string Email { get; set; }

        public string Introduction { get; set; }

        public string LookingFor { get; set; }

        public string Interests { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

    }
}
