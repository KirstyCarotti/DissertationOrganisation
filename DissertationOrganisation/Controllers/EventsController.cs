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
        private readonly IDateTimeService dateTimeService; 
        public EventsController(IEventService eventService, IDateTimeService dateTimeService)
        {
            this.eventService = eventService;
            this.dateTimeService = dateTimeService;
        }

        [HttpGet]
        public IEnumerable<EventModel> Get()
        {
            var result = eventService.GetEvents();
            List<EventModel> events = new List<EventModel>(); 
            foreach (Event e in result) {
                IEnumerable<int> repeatArrayInt= null;
                if (e.RepeatDays != null)
                {
                    var repeatArray = eventService.GetFlags(e.RepeatDays);
                    repeatArrayInt = repeatArray.Select(x => Convert.ToInt32(x));
                }

                EventModel eventModel = new EventModel
                {
                Id = e.Id,
                Name = e.Name,
                Description = e.Description,
                Location = e.Location,
                StartDate = e.StartDate,
                EndDate = e.EndDate,
                StartTime = e.StartTime,
                EndTime= e.EndTime,
                Repeat = e.Repeat,
                RepeatDays = repeatArrayInt,
                Colour = e.Colour,
                IsAllDay=e.IsAllDay
            };
                events.Add(eventModel);
        }

            return events;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EventModel eventModel)
        {

            RepeatDays[] repeatDays = eventModel.RepeatDays.Select(o => (RepeatDays)o).ToArray();
            RepeatDays? result = null;
            foreach (RepeatDays f in repeatDays)
            {
                result |= (RepeatDays)f;
            }
            if (eventModel.Repeat == null || eventModel.Repeat != Repeat.Weekly)
            {
                result = null;
            }
            Event e = new Event
            {
                Id = eventModel.Id,
                Name = eventModel.Name,
                Description = eventModel.Description,
                Location = eventModel.Location,
                StartDate = eventModel.StartDate == null ? dateTimeService.GetCurrentDateTime() : (DateTime)eventModel.StartDate,
                EndDate = eventModel.EndDate,
                Repeat = eventModel.Repeat == null ? Repeat.NoRepeat : (Repeat)eventModel.Repeat,
                RepeatDays = (RepeatDays?)result,
                Colour = eventModel.Colour,
                StartTime = eventModel.IsAllDay? "": eventModel.StartTime,
                EndTime= eventModel.IsAllDay? "" : eventModel.EndTime,
                IsAllDay = eventModel.IsAllDay

            };

            return CreatedAtAction("Get", new { id = e.Id }, eventService.AddEvent(e));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] EventModel eventModel)
        {
            RepeatDays[] repeatDays = eventModel.RepeatDays.Select(o => (RepeatDays)o).ToArray();
            RepeatDays? result = null;
            foreach (RepeatDays f in repeatDays)
            {
                result |= (RepeatDays)f;
            }
            if (eventModel.Repeat == null || eventModel.Repeat != Repeat.Weekly){
                result = null;
            }
            Event e = new Event
            {
                Id = eventModel.Id,
                Name = eventModel.Name,
                Description = eventModel.Description,
                Location = eventModel.Location,
                StartDate = eventModel.StartDate == null ? dateTimeService.GetCurrentDateTime() : (DateTime)eventModel.StartDate,
                EndDate = eventModel.EndDate,
                Repeat = eventModel.Repeat == null ? Repeat.NoRepeat : (Repeat)eventModel.Repeat,
                RepeatDays = (RepeatDays?)result,
                Colour = eventModel.Colour,
                StartTime = eventModel.IsAllDay ? "" : eventModel.StartTime,
                EndTime = eventModel.IsAllDay ? "" : eventModel.EndTime,
                IsAllDay = eventModel.IsAllDay

            };

            eventService.UpdateEvent(id, e);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
             eventService.DeleteEvent(id);
            return NoContent();
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
