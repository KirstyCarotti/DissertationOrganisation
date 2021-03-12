using DissertationOrganisation.Models;
using System;
using System.Collections.Generic;

namespace DissertationOrganisation.Services
{

    public interface IEventService
    {
        public IEnumerable<Event> GetEvents();
        public Event AddEvent(Event e);
    }
}
