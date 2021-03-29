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
    public class RepeatController : Controller
    {
        public RepeatController(IDateTimeService dateTimeService)
        {
        }

        [HttpGet]
        public IEnumerable<RepeatObject> Get()
        {
            List<RepeatObject> repeatObjects = new List<RepeatObject>(); 
            //TODO Find a captial and input a space
            var repeats = Enum.GetValues(typeof(Repeat))
                    .Cast<Repeat>()
                    .Select(v => v.ToString())
                    .ToList();
            for(int i = 0; i < repeats.Count(); i++)
            {
                repeatObjects.Add(new RepeatObject
                {
                    id = i,
                    repeat = repeats[i]
                });
            }
            return repeatObjects;
        }


    }
}
