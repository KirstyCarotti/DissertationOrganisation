using System;

namespace DissertationOrganisation.Models
{
    public enum Repeat
    {
        NoRepeat,
        Everyday,
        Weekly, //has the options of days 
        Yearly 
    }
    [Flags]
    public enum RepeatDays
    {
        Monday=0,
        Tuesday=1,
        Wednesday=2,
        Thursday=4,
        Friday=8,
        Saturday=16,
        Sunday=32
    }
    public class RepeatObject
    {
        public int id { get; set; }

        public string repeat { get; set; }
    }

}