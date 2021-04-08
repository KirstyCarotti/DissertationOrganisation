using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DissertationOrganisation.Models
{
    public class TodaysHabits
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Colour { get; set; }
        public bool IsComplete { get; set; }
        public bool IsMeasurable { get; set; }
        public int? NumberOfBlocks { get; set; }
        public int? NumberOfBlocksCompleted { get; set; }
    }
}
