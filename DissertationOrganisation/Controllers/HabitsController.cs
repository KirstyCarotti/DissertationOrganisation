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
    public class HabitsController : Controller
    {
        private readonly IHabitService habitService; 
        public HabitsController(IHabitService habitService)
        {
            this.habitService = habitService; 
        }

        [HttpGet]
        public IEnumerable<Habit> Get()
        {
            return habitService.GetHabits();
        }

        // GET api/habits/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
           var result = habitService.GetHabit(id);
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] HabitModel habitModel)
        {
            RepeatDays[] repeatDays = habitModel.RepeatDays.Select(o => (RepeatDays)o).ToArray();
            RepeatDays result = 0;
            foreach (RepeatDays f in repeatDays)
            {
                result |= (RepeatDays)f; 
            }
            Habit habit = new Habit
            {
                Id = habitModel.Id,
                Name = habitModel.Name,
                Description = habitModel.Description,
                StartDate = habitModel.StartDate,
                EndDate = habitModel.EndDate,
                Repeat = habitModel.Repeat,
                RepeatDays = (RepeatDays)result,
                Colour = habitModel.Colour,
                Mesurable = habitModel.Mesurable,
                NumberOfBlocks = habitModel.NumberOfBlocks,
                RepresentationOfBlocks = habitModel.RepresentationOfBlocks
            };
            return CreatedAtAction("Get", new { id = habit.Id }, habitService.AddHabit(habit));
        }
        // PUT api/habits/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Habit habit)
        {
            habitService.UpdateHabit(id, habit);
            return NoContent();
        }

        // DELETE api/Habits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            habitService.DeleteHabit(id);
            return NoContent();
        }
        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}
