using DatingApp.API.Data.AppRepo;
using DatingApp.API.Helpers;
using DatingApp.API.Models.Messages;
using DatingApp.API.Models.Users;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DatingApp.API.Data.UsersRepository
{
    public interface IUsersRepository : IAppRepository
    {
        Task<PagedList<User>> GetUsers(UserParams userParams);

        Task<User> GetUser(int id, int currentUserId = 0);

        Task<Like> GetLike(int userId, int recipientId);

        Task<Message> GetMessage(int id);

        Task<PagedList<Message>> GetMessages(MessageParams messageParams);

        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}
