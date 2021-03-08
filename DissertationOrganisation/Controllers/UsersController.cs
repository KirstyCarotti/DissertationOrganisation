using DissertationOrganisation.Models;
using DissertationOrganisation.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DissertationOrganisation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UserService userService; 
        public UsersController(UserService userService)
        {
            this.userService = userService; 
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return userService.GetUsers();
        }
        // GET api/users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(userService.GetUser(id));
        }
        // POST api/users
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            return CreatedAtAction("Get", new { id = user.Id }, userService.AddUser(user));
        }
        // PUT api/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] User user)
        {
            userService.UpdateUser(id, user);
            return NoContent();
        }
        // DELETE api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            userService.DeleteUser(id);
            return NoContent();
        }
        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}
