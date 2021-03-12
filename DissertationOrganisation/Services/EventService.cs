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

        public EventService(DatabaseContext context)
        {
            _context = context;
        }

        public Event AddEvent(Event e )
        {
            _context.Events.Add(e);
            _context.SaveChanges();
            return e;
        }

        public IEnumerable<Event> GetEvents()
        {
            var events = _context.Events
                    .Where(listItems => listItems.Date.Day == Globals.GetPageDateTime().Date.Day)
                    .Where(listItems => listItems.Date.Month == Globals.GetPageDateTime().Date.Month)
                    .Where(listItems => listItems.Date.Year == Globals.GetPageDateTime().Date.Year)
                    .ToList();
            return events;
        }
    }
}
