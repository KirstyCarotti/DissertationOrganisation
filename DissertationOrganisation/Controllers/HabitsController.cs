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
