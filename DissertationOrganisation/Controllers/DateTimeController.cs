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
    public class DateTimeController : Controller
    {
        private readonly IDateTimeService dateTimeService;
        public DateTimeController(IDateTimeService dateTimeService)
        {
            this.dateTimeService = dateTimeService; 
        }

        [HttpGet]
        public DateTime Get()
        {
            return dateTimeService.GetCurrentDateTime(); 
        }


        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Object date)
        {
            var dateStrings = date.ToString().Split(":")[1].Split('"')[1].Split('T')[0].Split('-');
            var newDate = dateStrings[2] + "-" + dateStrings[1] + "-" + dateStrings[0];
            DateTime dateTime = Convert.ToDateTime(newDate);
            dateTimeService.UpdateDateTime(dateTime);
            return NoContent();

        }
        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }


    }
}
