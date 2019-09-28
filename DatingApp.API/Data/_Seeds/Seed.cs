using DatingApp.API.Models.Users;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data.Seeds
{
    public class Seed
    {
        public static void SeedUsers(DataContext context, IAuthRepository authRepository)
        {
            if (!context.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/_Seeds/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                foreach (var user in users)
                {
                    byte[] passwordHash, passwordSalt;
                    authRepository.CreatePasswordHash("password07!", out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();

                    context.Users.Add(user);
                }

                context.SaveChanges();
            }
        }
    }
}
