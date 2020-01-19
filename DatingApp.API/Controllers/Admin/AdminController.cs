using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data.AdminRepository;
using DatingApp.API.Data.PhotosRepository;
using DatingApp.API.Dtos.Photos;
using DatingApp.API.Dtos.Users;
using DatingApp.API.Helpers;
using DatingApp.API.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _repo;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IPhotosRepository _photoRepo;
        private readonly IOptions<CloudinarySettings> _cloudinarySettings;
        private Cloudinary _cloudinary;

        public AdminController(
            IAdminRepository repo,
            IMapper mapper,
            UserManager<User> userManager,
            IPhotosRepository photoRepo,
            IOptions<CloudinarySettings> cloudinarySettings)
        {
            this._repo = repo;
            this._mapper = mapper;
            this._userManager = userManager;
            this._photoRepo = photoRepo;
            this._cloudinarySettings = cloudinarySettings;

            this.SetupCloudinaryAccount();
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("usersWithRoles")]
        public async Task<IEnumerable<UserWithRolesDto>> GetUsersWithRoles()
        {
            var results = await this._repo.GetUsersWithRoles();
            return this._mapper.Map<IEnumerable<UserWithRolesDto>>(results);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("roles")]
        public async Task<IEnumerable<string>> GetRoles()
        {
            var results = await this._repo.GetRoles();
            return results.Select(x => x.Name);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("editRoles/{userName}")]
        public async Task<IActionResult> EditRoles(string username, RoleEditDto roleEditDto)
        {
            var user = await this._userManager.FindByNameAsync(username);
            var userRoles = await this._userManager.GetRolesAsync(user);
            var selectedRoles = roleEditDto.RoleNames ?? new string[] { };

            var result = await this._userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded)
            {
                return BadRequest("Failed to add the roles");
            }

            result = await this._userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded)
            {
                return BadRequest("Failed to remove the roles");
            }

            return Ok(await this._userManager.GetRolesAsync(user));
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photosForModeration")]
        public async Task<IEnumerable<PhotoForReturnDto>> GetUnapprovedPhotos()
        {
            var results = await this._repo.GetPhotosForModeration();
            return this._mapper.Map<IEnumerable<PhotoForReturnDto>>(results);
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPut("moderatePhoto/{photoId}")]
        public async Task<IActionResult> ModeratePhoto(int photoId, PhotoForModeration photo)
        {
            var photoFromRepo = await this._photoRepo.GetPhoto(photoId);

            if (photoFromRepo == null)
            {
                return BadRequest("The photo doesn't exist");
            }

            if (photo.Moderation)
            {
                photoFromRepo.IsApproved = photo.Moderation;
            } 
            else
            {
                if (photoFromRepo.PublicId != null)
                {
                    var result = DeleteFileInCloudinary(photoFromRepo.PublicId);
                    if (result)
                    {
                        this._photoRepo.Delete(photoFromRepo);
                    }
                }
                else
                {
                    this._photoRepo.Delete(photoFromRepo);
                }
            }

            if (await _photoRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to moderate the photo");
        }

        private void SetupCloudinaryAccount()
        {
            Account acc = new Account(
                _cloudinarySettings.Value.CloudName,
                _cloudinarySettings.Value.ApiKey,
                _cloudinarySettings.Value.ApiSecret
            );

            this._cloudinary = new Cloudinary(acc);
        }

        private bool DeleteFileInCloudinary(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = _cloudinary.Destroy(deleteParams);

            if (result.Result == "ok")
            {
                return true;
            }

            return false;
        }

    }
}