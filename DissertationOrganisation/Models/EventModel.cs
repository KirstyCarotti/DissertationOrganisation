using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DissertationOrganisation.Models
{
    public class EventModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Repeat? Repeat { get; set; }
        public IEnumerable<int> RepeatDays { get; set; }
        public string Colour { get; set; } //The colour assigned to the Event in HEX
        public string StartTime { get; set; } //could be empty 
        public string EndTime { get; set; } //coule be empty 
        public bool IsAllDay { get; set; }
    }
}
