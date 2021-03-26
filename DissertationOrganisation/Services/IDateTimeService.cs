using DissertationOrganisation.Models;
using System;
using System.Collections.Generic;

namespace DissertationOrganisation.Services
{

    public interface IDateTimeService
        {

        public DateTime GetPageDateTime();
        public DateTime GetCurrentDateTime();

        public bool UpdateDateTime(DateTime date);
        DateTimeHabit GetDateTimeHabit();
    }
}
