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
    public class ListsController : Controller
    {
        private readonly IListService listService; 
        public ListsController(IListService listService)
        {
            this.listService = listService; 
        }

        [HttpGet]
        public IEnumerable<List> Get()
        {
            return listService.GetLists();
        }
        // GET api/lists/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
           var result = listService.GetList(id);
            return Ok(result);
        }
        // POST api/lists
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] List list)
        {
            return CreatedAtAction("Get", new { id = list.Id }, listService.AddList(list));
        }
        // PUT api/lists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] List list)
        {
            listService.UpdateList(id, list);
            return NoContent();
        }

        // DELETE api/lists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            listService.DeleteList(id);
            return NoContent();
        }
        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}
