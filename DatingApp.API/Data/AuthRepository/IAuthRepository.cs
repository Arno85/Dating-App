using DatingApp.API.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
	public interface IAuthRepository
	{
		Task<User> Register(User user, string password);

		Task<User> Login(string username, string password);

		Task<bool> UsernameExists(string username);

        Task<bool> EmailExists(string email);

        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
    }
}
