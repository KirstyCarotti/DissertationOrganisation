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
        private readonly IDateTimeService dateTimeService; 
        public HabitsController(IHabitService habitService, IDateTimeService dateTimeService)
        {
            this.habitService = habitService; 
            this.dateTimeService = dateTimeService; 
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
            IEnumerable<int> repeatArrayInt = null;
            if (result.RepeatDays != null)
            {
                var repeatArray = habitService.GetFlags(result.RepeatDays);
                repeatArrayInt = repeatArray.Select(x => Convert.ToInt32(x));
            }

            HabitModel habitModel = new HabitModel
            {
                 Id = result.Id,
                Name = result.Name,
                Description = result.Description,
                StartDate = result.StartDate,
                EndDate = result.EndDate,
                Repeat = result.Repeat,
                RepeatDays = repeatArrayInt,
                Colour = result.Colour,
                Mesurable = result.Mesurable,
                NumberOfBlocks = result.NumberOfBlocks,
                RepresentationOfBlocks = result.RepresentationOfBlocks
    };

            return Ok(habitModel);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] HabitModel habitModel)
        {
            RepeatDays[] repeatDays = habitModel.RepeatDays.Select(o => (RepeatDays)o).ToArray();
            RepeatDays? result = null;
            foreach (RepeatDays f in repeatDays)
            {
                result |= (RepeatDays)f; 
            }
            if (habitModel.Repeat == null || habitModel.Repeat != Repeat.Weekly)
            {
                result = null;
            }
            Habit habit = new Habit
            {
                Id = habitModel.Id,
                Name = habitModel.Name,
                Description = habitModel.Description,
                StartDate = habitModel.StartDate==null? dateTimeService.GetCurrentDateTime() :(DateTime) habitModel.StartDate,
                EndDate = habitModel.EndDate,
                Repeat = habitModel.Repeat==null? Repeat.NoRepeat :(Repeat) habitModel.Repeat,
                RepeatDays = (RepeatDays?)result,
                Colour = habitModel.Colour,
                Mesurable = habitModel.Mesurable,
                NumberOfBlocks = habitModel.NumberOfBlocks,
                RepresentationOfBlocks = habitModel.RepresentationOfBlocks
            };
            return CreatedAtAction("Get", new { id = habit.Id }, habitService.AddHabit(habit));
        }
        // PUT api/habits/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] HabitModel habitModel)
        {
            RepeatDays[] repeatDays = habitModel.RepeatDays.Select(o => (RepeatDays)o).ToArray();
            RepeatDays? result = null;
            foreach (RepeatDays f in repeatDays)
            {
                result |= (RepeatDays)f;
            }
            if (habitModel.Repeat == null || habitModel.Repeat != Repeat.Weekly)
            {
                result = null;
            }
            Habit habit = new Habit
            {
                Id = habitModel.Id,
                Name = habitModel.Name,
                Description = habitModel.Description,
                StartDate = habitModel.StartDate == null ? dateTimeService.GetCurrentDateTime() : (DateTime)habitModel.StartDate,
                EndDate = habitModel.EndDate,
                Repeat = habitModel.Repeat == null ? Repeat.NoRepeat : (Repeat)habitModel.Repeat,
                RepeatDays = (RepeatDays?)result,
                Colour = habitModel.Colour,
                Mesurable = habitModel.Mesurable,
                NumberOfBlocks = habitModel.NumberOfBlocks,
                RepresentationOfBlocks = habitModel.RepresentationOfBlocks
            };
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
