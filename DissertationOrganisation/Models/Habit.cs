using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DissertationOrganisation.Models
{
    public class Habit
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; } //start date just defaults to the date made 
        public DateTime? EndDate { get; set; } //can be nullable goes on forever 
        public Repeat Repeat { get; set; }
        public RepeatDays? RepeatDays {get; set;}
        public string Colour { get; set; } //The colour assigned to the Habit in HEX
        public bool Mesurable { get; set; }
        public int? NumberOfBlocks { get; set; } //number of blocks in the measurable habit 
        public string? RepresentationOfBlocks { get; set; } //what each block of the mesurable habit represents 
    }
}
