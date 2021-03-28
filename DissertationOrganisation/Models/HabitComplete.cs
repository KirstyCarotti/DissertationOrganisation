using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DissertationOrganisation.Models
{
    public class HabitComplete
    {
        public int Id { get; set; }
        [ForeignKey("Habit")]
        public int HabitId { get; set; }
        public DateTime Date { get; set; }
        public bool IsComplete { get; set; }

    }
}
