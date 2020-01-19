using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data.UsersRepository;
using DatingApp.API.Dtos.Users;
using DatingApp.API.Helpers;
using DatingApp.API.Models.Users;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers.Users
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(LogUserActivity))]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IMapper _mapper;

        public UsersController(IUsersRepository userRepository, IMapper mapper)
        {
            _usersRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _usersRepository.GetUser(currentUserId);

            userParams.UserId = currentUserId;

            if (string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }

            var users = await _usersRepository.GetUsers(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UsersListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var user = await _usersRepository.GetUser(id, currentUserId);
            var userToReturn = _mapper.Map<UserForDetailDto>(user);

            if (id != currentUserId)
            {
                userToReturn.Photos = userToReturn.Photos.Where(x => x.IsApproved).ToList();
            }

            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (checkUser(id))
            {
                return Unauthorized();
            }

            var userFromRepo = await _usersRepository.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);
            _usersRepository.Update(userFromRepo);

            if(await _usersRepository.SaveAll())
            {
                return NoContent();
            }

            return BadRequest($"Updating user {id} failed on save");
        }

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id, int recipientId)
        {
            if (checkUser(id))
            {
                return Unauthorized();
            }

            var like = await _usersRepository.GetLike(id, recipientId);

            if (like != null)
            {
                return BadRequest("You already like this user");
            }

            if (await _usersRepository.GetUser(recipientId) == null)
            {
                return NotFound();
            }

            like = new Like
            {
                LikerId = id,
                LikeeId = recipientId
            };

            await _usersRepository.Add<Like>(like);

            if (await _usersRepository.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to like user");
        }

        private bool checkUser(int userId)
        {
            return userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        }
    }
}