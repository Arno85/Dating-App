﻿using DatingApp.API.Data.AppRepo;
using DatingApp.API.Helpers;
using DatingApp.API.Models.Messages;
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

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await _context.Likes
                .FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == recipientId);
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var usersFromDb = _context.Users
                .Include(p => p.Photos)
                .OrderByDescending(x => x.LastActive)
                .AsQueryable();

            usersFromDb = usersFromDb.Where(u => u.Id != userParams.UserId);
            usersFromDb = usersFromDb.Where(u => u.gender == userParams.Gender);

            if (userParams.Likees)
            {
                var userLikees = await GetUserLikes(userParams.UserId, userParams.Likers);
                usersFromDb = usersFromDb.Where(u => userLikees.Contains(u.Id));
            }

            if (userParams.Likers)
            {
                var userLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
                usersFromDb = usersFromDb.Where(u => userLikers.Contains(u.Id));
            }

            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                usersFromDb = usersFromDb.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
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

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers)
        {
            var usersFromDb = await _context.Users
                .Include(x => x.Likers)
                .Include(x => x.Likees)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (likers)
            {
                return usersFromDb.Likers
                    .Where(u => u.LikeeId == id)
                    .Select(i => i.LikerId);
            }
            else
            {
                return usersFromDb.Likees
                    .Where(u => u.LikerId == id)
                    .Select(i => i.LikeeId);
            }
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages
                .Include(m => m.Sender).ThenInclude(u => u.Photos)
                .Include(m => m.Recipient).ThenInclude(u => u.Photos)
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<PagedList<Message>> GetMessages(MessageParams messageParams)
        {
            var messages = _context.Messages
                 .Include(m => m.Sender).ThenInclude(u => u.Photos)
                 .Include(m => m.Recipient).ThenInclude(u => u.Photos)
                 .AsQueryable();

            switch (messageParams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(m =>
                        m.RecipientId == messageParams.UserId &&
                        m.RecipientDeleted == false
                    );
                    break;
                case "Outbox":
                    messages = messages.Where(m =>
                        m.SenderId == messageParams.UserId &&
                        m.SenderDeleted == false
                    );
                    break;
                default:
                    messages = messages.Where(m =>
                        m.RecipientId == messageParams.UserId &&
                        m.RecipientDeleted == false &&
                        m.IsRead == false
                    );
                    break;
            }

            messages = messages.OrderByDescending(d => d.MessageSent);

            return await PagedList<Message>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            return await _context.Messages
                 .Include(m => m.Sender).ThenInclude(u => u.Photos)
                 .Include(m => m.Recipient).ThenInclude(u => u.Photos)
                 .Where(m => 
                    m.RecipientId == userId && m.RecipientDeleted == false && m.SenderId == recipientId ||
                    m.RecipientId == recipientId && m.SenderDeleted == false && m.SenderId == userId
                  )
                 .OrderByDescending(m => m.MessageSent)
                 .ToListAsync();
        }
    }
}
