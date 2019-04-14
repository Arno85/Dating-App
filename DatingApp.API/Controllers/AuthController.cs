using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Factories.TokenFactory;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace DatingApp.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[AllowAnonymous]
	public class AuthController : ControllerBase
	{
		private readonly IAuthRepository _repo;
		private readonly IConfiguration _config;
		private readonly ITokenFactory _tokenFactory;

		public AuthController(IAuthRepository repo, ITokenFactory tokenFactory, IConfiguration config)
		{
			_repo = repo;
			_tokenFactory = tokenFactory;
			_config = config;
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register(UserForRegisterDto userForRegister)
		{
			userForRegister.Username = userForRegister.Username.ToLower();

			if (await _repo.UserExists(userForRegister.Username))
			{
				return BadRequest("Username already exists");
			}

			var userToCreate = new User
			{
				Username = userForRegister.Username
			};

			var createdUser = await _repo.Register(userToCreate, userForRegister.Password);

			return this.Ok(createdUser);
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

			return Ok(_tokenFactory.GetToken());

		}
	}
}