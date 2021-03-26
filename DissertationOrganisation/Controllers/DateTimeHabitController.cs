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
        private readonly IDateTimeService dateTimeService;
        public DateTimeHabitController(IDateTimeService dateTimeService)
        {
            this.dateTimeService = dateTimeService;
        }

        [HttpGet]
        public DateTimeHabit Get()
        {
            return dateTimeService.GetDateTimeHabit();
        }
    }
}
