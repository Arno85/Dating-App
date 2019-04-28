using DatingApp.API.Dtos.Auth;
using DatingApp.API.Models.Users;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.API.Factories.TokenFactory
{
	public class TokenFactory : ITokenFactory
	{
		private readonly IConfiguration _config;

		private TokenDto _token;

		public TokenFactory(IConfiguration config)
		{
			_config = config;
		}

		public void BuildToken(User user)
		{
			setToken(setClaims(user), setCredentials());
		}

		public TokenDto GetToken()
		{
			return _token;
		}

		private Claim[] setClaims(User user)
		{
			return new[]
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim(ClaimTypes.Name, user.Username)
			};
		}

		private SigningCredentials setCredentials()
		{
			var key = new SymmetricSecurityKey(Encoding.UTF8
				.GetBytes(_config.GetSection("AppSettings:Token").Value));

			return new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
		}

		private void setToken(Claim[] claims, SigningCredentials creds)
		{
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.Now.AddDays(1),
				SigningCredentials = creds
			};

			var tokenHandler = new JwtSecurityTokenHandler();
			var token = tokenHandler.CreateToken(tokenDescriptor);
			_token = new TokenDto
			{
				Token = tokenHandler.WriteToken(token)
			};
		}
	}
}