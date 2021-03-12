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
    public class EventsController : Controller
    {
        private readonly IEventService eventService; 
        public EventsController(IEventService eventService)
        {
            this.eventService = eventService; 
        }
        
        [HttpGet]
        public IEnumerable<Event> Get()
        {
            return eventService.GetEvents();// eventService.GetLists();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Event e)
        {
            return CreatedAtAction("Get", new { id = e.Id }, eventService.AddEvent(e));
        }
        /*
        // GET api/lists/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
           //var result = listService.GetList(id);
            return null;
        }

        // PUT api/lists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Event event)
        {
            //listService.UpdateList(id, list);
            return null;
        }

        // DELETE api/lists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
           // listService.DeleteList(id);
            return NoContent();
        }
        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }*/
    }
}
