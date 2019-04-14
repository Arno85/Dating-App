﻿using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DatingApp.API.Factories.TokenFactory
{
	public interface ITokenFactory
	{
		void BuildToken(User user);
		TokenDto GetToken();
	}
}