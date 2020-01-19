using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using DatingApp.API.Dtos.Countries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace DatingApp.API.Controllers.Countries
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class CountriesController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _config;

        public CountriesController(
            IHttpClientFactory httpClient,
            IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetCountries()
        {
            var countryList = new List<CountryDto>();

            var request = new HttpRequestMessage(HttpMethod.Get, _config.GetConnectionString("CountriesApi"));
            var client = _httpClient.CreateClient();
            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                using var responseStream = await response.Content.ReadAsStreamAsync();
                var results = await JsonSerializer.DeserializeAsync<IEnumerable<CountryDto>>(responseStream, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                });

                return Ok(results);
            }

            return BadRequest("Cannot get the counties from the API");
        }
    }
}