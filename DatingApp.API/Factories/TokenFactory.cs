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

		private string _token;

		public TokenFactory(IConfiguration config)
		{
			this._config = config;
		}

		public void BuildToken(User user, IList<string> roles)
		{
			this.setToken(this.setClaims(user, roles), this.setCredentials());
		}

		public string GetToken()
		{
			return this._token;
		}

		private IEnumerable<Claim> setClaims(User user, IList<string> roles)
		{
			var claims = new List<Claim>
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim(ClaimTypes.Name, user.UserName)
			};

			foreach (var role in roles)
			{
				claims.Add(new Claim(ClaimTypes.Role, role));
			}

			return claims;
		}

		private SigningCredentials setCredentials()
		{
			var key = new SymmetricSecurityKey(Encoding.UTF8
				.GetBytes(_config.GetSection("AppSettings:Token").Value));

			return new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
		}

		private void setToken(IEnumerable<Claim> claims, SigningCredentials creds)
		{
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.Now.AddDays(1),
				SigningCredentials = creds
			};

			var tokenHandler = new JwtSecurityTokenHandler();
			var token = tokenHandler.CreateToken(tokenDescriptor);

            this._token = tokenHandler.WriteToken(token);
		}
	}
}