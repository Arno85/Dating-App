using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data.UsersRepository;
using DatingApp.API.Dtos.Users;
using DatingApp.API.Helpers;
using DatingApp.API.Models.Messages;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers.Users
{
    [Route("api/users/{id}/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(LogUserActivity))]
    public class MessagesController : ControllerBase
    {
        private readonly IUsersRepository _userRepo;
        private readonly IMapper _mapper;

        public MessagesController(IUsersRepository userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        [HttpGet("{messageId}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int id, int messageId)
        {
            if (checkUser(id))
            {
                return Unauthorized();
            }

            var messageFromRepo = await _userRepo.GetMessage(messageId);

            if (messageFromRepo == null)
            {
                return NotFound();
            }

            return Ok(this._mapper.Map<MessageToReturnDto>(messageFromRepo));
        }

        [HttpGet]
        public async Task<IActionResult> GetMessages(int id, [FromQuery]MessageParams messageParams)
        {
            if (checkUser(id))
            {
                return Unauthorized();
            }

            messageParams.UserId = id;

            var messagesFromRepo = await _userRepo.GetMessages(messageParams);

            var messages = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            Response.AddPagination(messagesFromRepo.CurrentPage, messagesFromRepo.PageSize, messagesFromRepo.TotalCount, messagesFromRepo.TotalPages);

            return Ok(messages);
        }

        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int id, int recipientId)
        {
            if (checkUser(id))
            {
                return Unauthorized();
            }

            var messagesFromRepo = await _userRepo.GetMessageThread(id, recipientId);

            var messageThread = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            return Ok(messageThread);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int id, [FromBody]MessageForCreationDto messageForCreationDto)
        {
            if (checkUser(id))
            {
                return Unauthorized();
            }

            var recipient = await this._userRepo.GetUser(messageForCreationDto.RecipientId);

            if (recipient == null)
            {
                return BadRequest("Could not find user");
            }

            messageForCreationDto.SenderId = id;
            var message = _mapper.Map<Message>(messageForCreationDto);
            await _userRepo.Add(message);

            if (await _userRepo.SaveAll())
            {
                var messageToReturn = _mapper.Map<MessageToReturnDto>(await _userRepo.GetMessage(message.Id));
                return CreatedAtRoute("GetMessage", new { id, messageId = message.Id }, messageToReturn);
            }

            throw new Exception("Creating the message failed on save");
        }

        [HttpPost("{messageId}")]
        public async Task<IActionResult> DeleteMessage(int id, int messageId)
        {
            if (checkUser(id))
            {
                return Unauthorized();
            }

            var messageFromRepo = await _userRepo.GetMessage(messageId);

            if (messageFromRepo.SenderId == id)
            {
                messageFromRepo.SenderDeleted = true;
            }

            if (messageFromRepo.RecipientId == id)
            {
                messageFromRepo.RecipientDeleted = true;
            }

            if (messageFromRepo.SenderDeleted && messageFromRepo.RecipientDeleted)
            {
                _userRepo.Delete(messageFromRepo);
            }

            if (await _userRepo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception("Error deleting the message");
        }

        [HttpPost("{messageId}/read")]
        public async Task<IActionResult> MarkMessageAsRead(int id, int messageId)
        {
            if (checkUser(id))
            {
                return Unauthorized();
            }

            var messageFromRepo = await _userRepo.GetMessage(messageId);

            if (messageFromRepo.RecipientId != id)
            {
                return Unauthorized();
            }

            messageFromRepo.IsRead = true;
            messageFromRepo.DateRead = DateTime.Now;

            await _userRepo.SaveAll();

            return NoContent();
        }

        private bool checkUser(int userId)
        {
            return userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        }
    }
}