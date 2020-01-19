using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data.PhotosRepository;
using DatingApp.API.Data.UsersRepository;
using DatingApp.API.Dtos.Photos;
using DatingApp.API.Helpers;
using DatingApp.API.Models.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers.Users
{

    [Route("api/users/{id}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IPhotosRepository _photosRepository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinarySettings;
        private Cloudinary _cloudinary;

        public PhotosController(
            IUsersRepository usersRepository,
            IPhotosRepository photosRepository,
            IMapper mapper,
            IOptions<CloudinarySettings> cloudinarySettings)
        {
            _usersRepository = usersRepository;
            _photosRepository = photosRepository;
            _mapper = mapper;
            _cloudinarySettings = cloudinarySettings;

            SetupCloudinaryAccount();
        }


        [HttpGet("{photoId}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int photoId)
        {
            var photoFromRepo = await _photosRepository.GetPhoto(photoId);

            return Ok(_mapper.Map<PhotoForReturnDto>(photoFromRepo));
        }

        [HttpPost]
        public async Task<IActionResult> AddPhoto(int id, [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            if (checkUser(id))
            {
                return Unauthorized();
            }

            var userFromRepo = await _usersRepository.GetUser(id);
            var uploadResult = UploadFileToCloudinary(photoForCreationDto.File, userFromRepo.Id);

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);
            photo.UserId = userFromRepo.Id;
            photo.IsApproved = false;

            if (!userFromRepo.Photos.Any(u => u.IsMain))
            {
                photo.IsMain = true;
            }

            await _photosRepository.Add<Photo>(photo);

            if (await _photosRepository.SaveAll())
            {
                return CreatedAtRoute("GetPhoto", new { id, photoId = photo.Id }, _mapper.Map<PhotoForReturnDto>(photo));
            }

            return BadRequest("Could not add the photo");
        }

        [HttpPost("{photoId}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int id, int photoId)
        {
            if (checkUser(id))
            {
                return Unauthorized();
            }

            var userFromRepo = await this._usersRepository.GetUser(id);
            var photoFromRepo = userFromRepo.Photos.Single(p => p.Id == photoId);
            var currentMainPhoto = userFromRepo.Photos.Single(p => p.IsMain);

            if (!checkIfPhotoExists(photoId, userFromRepo))
            {
                return Unauthorized();
            }

            if (photoFromRepo.IsMain)
            {
                return BadRequest("This is already the main photo");
            }

            currentMainPhoto.IsMain = false;
            photoFromRepo.IsMain = true;

            if (await _photosRepository.SaveAll())
            {
                return NoContent();
            }

            return BadRequest("Could not set the photo to main");
        }

        [HttpDelete("{photoId}")]
        public async Task<IActionResult> DeletePhoto(int id, int photoId)
        {
            if (checkUser(id))
            {
                return Unauthorized();
            }

            var userFromRepo = _usersRepository.GetUser(id);
            var photoFromRepo = _photosRepository.GetPhoto(photoId);
            await Task.WhenAll(userFromRepo, photoFromRepo);

            var currentMainPhoto = userFromRepo.Result.Photos.Where(p => p.IsMain).FirstOrDefault();

            if (!checkIfPhotoExists(photoId, userFromRepo.Result))
            {
                return Unauthorized();
            }

            if (photoFromRepo.Result.IsMain)
            {
                return BadRequest("You cannot delete your main photo");
            }

            if (photoFromRepo.Result.PublicId != null)
            {
                var result = DeleteFileInCloudinary(photoFromRepo.Result.PublicId);
                if (result)
                {
                    _photosRepository.Delete(photoFromRepo.Result);
                }
            }
            else
            {
                _photosRepository.Delete(photoFromRepo.Result);
            }

            if (await _photosRepository.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to delete the photo");
        }

        private bool checkUser(int userId)
        {
            return userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        }

        private bool checkIfPhotoExists(int photoId, User user)
        {
            return user.Photos.Any(p => p.Id == photoId);
        }

        private void SetupCloudinaryAccount()
        {
            Account acc = new Account(
                _cloudinarySettings.Value.CloudName,
                _cloudinarySettings.Value.ApiKey,
                _cloudinarySettings.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        private ImageUploadResult UploadFileToCloudinary(IFormFile file, int userId)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.Name, stream),
                        Folder = $"{_cloudinarySettings.Value.FolderName}/{userId}",
                        Transformation = new Transformation()
                            .Width(500)
                            .Height(500)
                            .Crop("fill")
                            .Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            return uploadResult;
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