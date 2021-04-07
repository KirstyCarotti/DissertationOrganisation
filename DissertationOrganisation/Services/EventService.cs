using DissertationOrganisation.Data;
using DissertationOrganisation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DissertationOrganisation.Services
{
    public class EventService : IEventService
    {
        private readonly DatabaseContext _context; 
        private readonly IDateTimeService _dateTimeService;

        public EventService(DatabaseContext context,  IDateTimeService dateTimeService)
        {
            _context = context;
            _dateTimeService = dateTimeService; 
    }

        public Event AddEvent(Event e )
        {
            _context.Events.Add(e);
            _context.SaveChanges();
            return e;
        }

        //ACTUALLY GET TODAYS EVENTS 
        public IEnumerable<Event> GetEvents()
        {
            DateTime current = _dateTimeService.GetPageDateTime();


            var todaysEvents = new List<Event>();
            var events = _context.Events.ToList();
            foreach (Event e in events)
            {

                //TODO Make compare date functions > < == 
                if (CompareDateLessThanOrEqual(e.StartDate, current))
                {
                    //if the habit is weekly and todays DAY is the same as one of the days of the habit 
                    //if habit is yearly and the day and montha re the same then we good 
                    //
                    if (e.EndDate == null || CompareDateGreaterThanOrEqual(e.EndDate, current))
                    {
                        if (e.Repeat == Repeat.NoRepeat)
                        {
                            if (CompareDateEquals(e.StartDate, current))
                            {
                                todaysEvents.Add(e);
                            }
                        }
                        else if (e.Repeat == Repeat.Weekly)
                        {
                            var todaysDay = current.DayOfWeek.ToString();
                            if (e.RepeatDays != null)
                            {
                                foreach (var repeatDay in GetFlags(e.RepeatDays))
                                {
                                    if (repeatDay.ToString().Equals(todaysDay))
                                    {
                                        todaysEvents.Add(e);
                                    }
                                }
                            }
                        }
                        else if (e.Repeat == Repeat.Yearly)
                        {
                            if (CompareDateYearly(e.StartDate, current))
                            {
                                todaysEvents.Add(e);
                            }
                        }
                        else if (e.Repeat == Repeat.Everyday)
                        {
                            todaysEvents.Add(e);
                        }
                    }
                }
            }
            return todaysEvents;
        }

        //Move this to an enum service TODO 
        public IEnumerable<Enum> GetFlags(Enum repeatDays)
        {

                foreach (Enum value in Enum.GetValues(repeatDays.GetType()))
                    if (repeatDays.HasFlag(value))
                        yield return value;
           
        }


        public void UpdateEvent(int id, Event e)
        {
            var _event = GetEvent(id);
            _event.Name = e.Name;
            _event.Description = e.Description;
            _event.Location = e.Location;
            _event.StartDate = e.StartDate; 
            _event.EndDate = e.EndDate; 
            _event.StartTime = e.StartTime;
            _event.EndTime = e.EndTime;
            _event.Repeat = e.Repeat;
            _event.RepeatDays = e.RepeatDays;
            _event.Colour = e.Colour;
            _event.IsAllDay = e.IsAllDay;
            _context.SaveChanges();

    }

        public Event GetEvent(int id)
        {
            return GetEvents().Where(x => x.Id == id).FirstOrDefault();
        }


        private bool CompareDateYearly(DateTime startDate, DateTime current)
        {
            if (startDate.Month == current.Month && startDate.Day == current.Day)
            {
                return true;
            }
            return false;
        }

        private bool CompareDateEquals(DateTime startDate, DateTime current)
        {
            if (startDate.Year == current.Year && startDate.Month == current.Month && startDate.Day == current.Day)
            {
                return true;
            }
            return false;
        }

        private bool CompareDateGreaterThanOrEqual(DateTime? endDate, DateTime current)
        {
            if (endDate == null)
            {
                return false;
            }
            if (endDate?.Year >= current.Year && endDate?.Month >= current.Month)
            {
                if (endDate?.Month == current.Month && endDate?.Day < current.Day)
                {
                    return false;
                }
                return true;
            }
            return false;

        }

        private bool CompareDateLessThanOrEqual(DateTime startDate, DateTime current)
        {
            //if start year is less tahn current yeat 
            //if start month is less than current month 
            if (startDate.Year <= current.Year && startDate.Month <= current.Month)
            {
                if (startDate.Month == current.Month && startDate.Day > current.Day)
                {
                    return false;
                }
                return true;
            }
            return false;
        }

        public void DeleteEvent(int id)
        {
            var e = _context.Events.Where(x => x.Id == id).FirstOrDefault();
            _context.Events.Remove(e);
            _context.SaveChanges();
        }
    }
}
