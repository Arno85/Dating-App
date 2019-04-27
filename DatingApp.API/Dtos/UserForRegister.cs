using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Dtos
{
	public class UserForRegisterDto
	{
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
		public string Username { get; set; }

		[Required]
		[StringLength(
			16,
			MinimumLength = 6,
			ErrorMessage = "You must specify password between 6 and 16 characters."
		)]
		[RegularExpression(
			"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\\d)(?=.*?\\W).*$",
			ErrorMessage = "The Password must contains at least one uppercase letter, one lowercase letter, one digit and one special character."
		)]
		public string Password { get; set; }
	}
}