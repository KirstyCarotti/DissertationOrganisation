namespace DissertationOrganisation.Models
{
    public enum Repeat
    {
        NoRepeat,
        Everyday,
        Weekly, //has the options of days 
        Yearly 
    }
    public enum RepeatDays
    {
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    }
    public class RepeatObject
    {
        public int id { get; set; }

        public string repeat { get; set; }
    }

}