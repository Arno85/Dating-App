using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos.Auth;
using DatingApp.API.Dtos.Users;
using DatingApp.API.Factories.TokenFactory;
using DatingApp.API.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace DatingApp.API.Controllers.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly ITokenFactory _tokenFactory;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, ITokenFactory tokenFactory, IConfiguration config, IMapper mapper)
        {
            _repo = repo;
            _tokenFactory = tokenFactory;
            _config = config;
            _mapper = mapper;
        }

        [HttpGet("verifyEmail/{email}")]
        public async Task<IActionResult> VerifyEmail(string email)
        {
            var emailExists = false;

            if (await _repo.EmailExists(email.ToLower()))
            {
                emailExists = true;
            }

            return Ok(emailExists);
        }

        [HttpGet("verifyUsername/{username}")]
        public async Task<IActionResult> VerifyUsername(string username)
        {
            var usernameExists = false;

            if (await _repo.UsernameExists(username.ToLower()))
            {
                usernameExists = true;
            }

            return Ok(usernameExists);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegister)
        {
            userForRegister.Username = userForRegister.Username.ToLower();
            userForRegister.Email = userForRegister.Email.ToLower();

            if (await _repo.EmailExists(userForRegister.Email))
            {
                return BadRequest("There is already an existing account with this email");
            }

            if (await _repo.UsernameExists(userForRegister.Username))
            {
                return BadRequest("Username already exists");
            }

            var userToCreate = _mapper.Map<User>(userForRegister);
            var createdUser = await _repo.Register(userToCreate, userForRegister.Password);
            var userTorReturn = _mapper.Map<UserForDetailDto>(createdUser);

            return this.CreatedAtRoute("GetUser", new { controller = "Users", id = createdUser.Id}, userTorReturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLogin)
        {
            var userFromRepo = await _repo.Login(userForLogin.Username.ToLower(), userForLogin.Password);

            if (userFromRepo == null)
            {
                return Unauthorized();
            }

            _tokenFactory.BuildToken(userFromRepo);

            var user = _mapper.Map<UsersListDto>(userFromRepo);

            return Ok(new
            {
                token = _tokenFactory.GetToken(),
                user = user

            });
        }
    }
}