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
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthController(
            IAuthRepository repo,
            ITokenFactory tokenFactory,
            IConfiguration config,
            IMapper mapper,
            UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this._repo = repo;
            this._tokenFactory = tokenFactory;
            this._config = config;
            this._mapper = mapper;
            this._userManager = userManager;
            this._signInManager = signInManager;
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
            var userToCreate = this._mapper.Map<User>(userForRegister);
            var result = await this._userManager.CreateAsync(userToCreate, userForRegister.Password);
            var userTorReturn = this._mapper.Map<UserForDetailDto>(userToCreate);

            if (result.Succeeded)
            {
                return this.CreatedAtRoute("GetUser", new { controller = "Users", id = userToCreate.Id }, userTorReturn);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLogin)
        {
            var userFromDb = await this._userManager.FindByNameAsync(userForLogin.Username);
            if (userFromDb == null)
            {
                return Unauthorized();
            }

            var result = await this._signInManager.CheckPasswordSignInAsync(userFromDb, userForLogin.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized();
            }

            var rolesFromDb = await this._userManager.GetRolesAsync(userFromDb);

            this._tokenFactory.BuildToken(userFromDb, rolesFromDb);
            var user = this._mapper.Map<UsersListDto>(userFromDb);

            return Ok(new
            {
                token = this._tokenFactory.GetToken(),
                user = user
            });
        }
    }
}