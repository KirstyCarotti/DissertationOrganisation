using DissertationOrganisation.Models;
using DissertationOrganisation.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DissertationOrganisation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RepeatDaysController : Controller
    {
        public RepeatDaysController(IDateTimeService dateTimeService)
        {
        }

        [HttpGet]
        public IEnumerable<RepeatObject> Get()
        {
            List<RepeatObject> repeatObjects = new List<RepeatObject>();
            //TODO Find a captial and input a space
            var repeats = Enum.GetValues(typeof(RepeatDays))
                    .Cast<RepeatDays>()
                    .Select(v => v.ToString())
                    .ToList();
            var ids = Enum.GetValues(typeof(RepeatDays))
                    .Cast<RepeatDays>()
                    .ToList();
            for (int i = 0; i < repeats.Count(); i++)
            {
                repeatObjects.Add(new RepeatObject
                {
                    id = (int) ids[i],
                    repeat = repeats[i]
                });
            }
            return repeatObjects;
        }


    }
}
