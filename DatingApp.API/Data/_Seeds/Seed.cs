using DatingApp.API.Models.Users;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace DatingApp.API.Data.Seeds
{
    public class Seed
    {
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/_Seeds/UserSeedData.json");
                var roleData = System.IO.File.ReadAllText("Data/_Seeds/RoleSeedData.json");

                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                var roles = JsonConvert.DeserializeObject<List<Role>>(roleData);

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                foreach (var user in users)
                {
                    userManager.CreateAsync(user, "Password07!").Wait();
                    userManager.AddToRoleAsync(user, "Member").Wait();
                }

                var adminUser = new User { UserName = "Admin" };
                var result = userManager.CreateAsync(adminUser, "Password07!").Result;

                if (result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Admin").Result;
                    userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" }).Wait();
                }

            }
        }
    }
}
