using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DissertationOrganisation.Models
{
    public class DateTimeHabit
    {
        public int DaysInMonth { get; set; }

        public DayOfWeek StartDayOfMonth { get; set; }

        public DateTime CurrentDate { get; set; }

        public string Month { get; set; }

    }
}
