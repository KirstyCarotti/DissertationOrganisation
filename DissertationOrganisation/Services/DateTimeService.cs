using DissertationOrganisation.Data;
using DissertationOrganisation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DissertationOrganisation.Services
{
    public class DateTimeService : IDateTimeService
    {

        public DateTimeService()
        {
            Globals.SetPageDateTime(GetCurrentDateTime());
        }

        public DateTime GetCurrentDateTime()
        {
            return DateTime.Now;
        }

        public DateTime GetPageDateTime()
        {
            return Globals.GetPageDateTime(); 
        }

        public bool UpdateDateTime(DateTime date)
        {
            Globals.SetPageDateTime(date);
            return true; 
        }
    }
}
