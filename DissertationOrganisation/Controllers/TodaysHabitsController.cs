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
        public TodaysHabitsController(IHabitService habitService)
        {
            this.habitService = habitService; 
        }

        [HttpGet]
        public IEnumerable<Habit> Get()
        {
            return habitService.GetTodaysHabits();
        }

    }
}
