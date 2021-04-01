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
    public class TodaysHabitsController : Controller
    {
        private readonly IHabitService habitService; 
        private readonly IDateTimeService dateTimeService; 
        public TodaysHabitsController(IHabitService habitService, IDateTimeService dateTimeService)
        {
            this.habitService = habitService; 
            this.dateTimeService = dateTimeService; 
        }

        [HttpGet]
        public IEnumerable<TodaysHabits> Get()
        {
            return habitService.GetTodaysHabits(dateTimeService.GetCurrentDateTime());
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TodaysHabits todaysHabits)
        {
            HabitComplete completeHabit = new HabitComplete
            {
                Id = 0,
                HabitId=todaysHabits.Id,
                Date= dateTimeService.GetCurrentDateTime(),
                IsComplete=todaysHabits.IsComplete
            }; 
            return CreatedAtAction("Get", new { id = completeHabit.Id }, habitService.UpdateHabitComplete(completeHabit));
        }

    }
}
