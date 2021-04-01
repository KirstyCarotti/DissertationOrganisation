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
    public class DateTimeHabitController : Controller
    {
        private readonly IHabitService habitService;
        private readonly IDateTimeService dateTimeService;
        public DateTimeHabitController(IDateTimeService dateTimeService, IHabitService habitService)
        {
            this.dateTimeService = dateTimeService;
            this.habitService = habitService;
        }

        [HttpGet]
        public DateTimeHabit Get()
        {
            return dateTimeService.GetDateTimeHabit();
        }

        //gets the habits for each day...
        [HttpPost]
        public  IEnumerable<TodaysHabits> Post([FromBody] GetDate dateModel)
        {
            if (dateModel.Date.Equals("null"))
            {
                return null;
            }
            //CHANGE TO USE GET DATE MODELA ND TEST 
            DateTime dateTime = DateTime.Parse(dateModel.Date);
            return habitService.GetTodaysHabits(dateTime); 
        }
    }
}
