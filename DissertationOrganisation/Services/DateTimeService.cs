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
            if (Globals.GetPageDateTime() == new DateTime())
            {
                Globals.SetPageDateTime(GetCurrentDateTime());
            }
        }

        public DateTime GetCurrentDateTime()
        {
            return DateTime.Now;
        }

        public DateTimeHabit GetDateTimeHabit()
        {
            //need to check if its current date time or page date time as page date time makes me thonk of the home page... 
            DateTime pageDateTime = Globals.GetPageDateTime();

           

            DateTimeHabit dateTimeHabit = new DateTimeHabit
            {
                Month = GetMonthName(pageDateTime.Month),
                CurrentDate = GetCurrentDateTime(),
                StartDayOfMonth = GetStartDay(pageDateTime.Day, pageDateTime.DayOfWeek),
                DaysInMonth = GetDaysInMonth(pageDateTime.Month, DateTime.IsLeapYear(pageDateTime.Year)),

    };
            return dateTimeHabit;

        }

        private int GetDaysInMonth(int month, bool isLeapYear)
        {
            if (month == 2)
            {
                if (isLeapYear)
                {
                    return 29;
                }
                return 28;
            }

            else if (month == 2 || month == 4 || month == 6 || month == 9 || month == 11 )
            {
                return 30;
            }

            return 31;
            
        }

        private DayOfWeek GetStartDay(int day, DayOfWeek dayOfWeek)
        {
            if(day == 1)
            {
                return dayOfWeek;
            }

            int count = day;
            while(count > 1)
            {
                dayOfWeek = GetDayBefore(dayOfWeek);
                count--; 
            }


            return dayOfWeek;
        }

        private DayOfWeek GetDayBefore(DayOfWeek dayOfWeek)
        {
            var dayBefore = dayOfWeek; 
            if(dayOfWeek == DayOfWeek.Monday)
            {
                dayBefore = DayOfWeek.Sunday;
            }
            else if (dayOfWeek == DayOfWeek.Tuesday)
            {
                dayBefore = DayOfWeek.Monday;
            }
            else if (dayOfWeek == DayOfWeek.Wednesday)
            {
                dayBefore = DayOfWeek.Tuesday;
            }
            else if (dayOfWeek == DayOfWeek.Thursday)
            {
                dayBefore = DayOfWeek.Wednesday;
            }
            else if (dayOfWeek == DayOfWeek.Friday)
            {
                dayBefore = DayOfWeek.Thursday;
            }
            else if (dayOfWeek == DayOfWeek.Saturday)
            {
                dayBefore = DayOfWeek.Friday;
            }
            else if (dayOfWeek == DayOfWeek.Sunday)
            {
                dayBefore = DayOfWeek.Saturday;
            }

            return dayBefore;
        }

        private string GetMonthName(int month)
        {
            switch (month)
            {
                case 1:
                    return "January";
                case 2:
                    return "February";
                case 3:
                    return "March";
                case 4:
                    return "April";
                case 5:
                    return "May";
                case 6:
                    return "June";
                case 7:
                    return "July";
                case 8:
                    return "August";
                case 9:
                    return "September";
                case 10:
                    return "October";
                case 11:
                    return "November";
                case 12:
                    return "December";
                default:
                    return ""; 
            }
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
