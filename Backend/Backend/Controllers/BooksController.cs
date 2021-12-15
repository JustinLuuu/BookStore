using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/Books")]
    public class BooksController : ControllerBase
    {
        private HttpClient httpRequest = new HttpClient();
        private HttpContent httpContent { get; set; }
        private const string url = "https://fakerestapi.azurewebsites.net/api/v1/Books";
       
        [HttpGet]
        public async Task<ActionResult<List<Book>>> Get()
        {
            var response = await httpRequest.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var books = JsonSerializer.Deserialize<List<Book>>(content);
                return books != null ? Ok(books) : NoContent();
            }
            return BadRequest();
        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<Book>> Get(int id)
        {
            var response = httpRequest.GetAsync(url + $"/{id}");

            if (response.Result.IsSuccessStatusCode)
            {
                var content = await response.Result.Content.ReadAsStringAsync();
                var book = JsonSerializer.Deserialize<Book>(content);
                return Ok(book);
            }
            return NotFound();
        }


        [HttpPost]
        public async Task<ActionResult<Book>> Post(Book book)
        {
            var dataToSend = JsonSerializer.Serialize(book);
            httpContent = new StringContent(dataToSend, System.Text.Encoding.UTF8, "application/json");
            var response = await httpRequest.PostAsync(url, httpContent);

            return response.IsSuccessStatusCode ? 
            Ok(response.Content.ReadAsStringAsync()) : BadRequest();
        }


        [HttpPut("{id:int}")]
        public async Task<ActionResult<Book>> Put(Book book, int id)
        {
            if(book.id != id)
            {
                return BadRequest("The book's id is different from the id that was sent on url");
            }

            var dataToSend = JsonSerializer.Serialize(book);
            httpContent = new StringContent(dataToSend, System.Text.Encoding.UTF8, "application/json");
            var response = await httpRequest.PutAsync(url + $"/{id}", httpContent);
            
            return response.IsSuccessStatusCode ? Ok() : BadRequest();
        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = await httpRequest.DeleteAsync(url + $"/{id}");
            return response.IsSuccessStatusCode ? Ok() : BadRequest();
        }

    }
}