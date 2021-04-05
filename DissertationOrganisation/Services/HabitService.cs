using DissertationOrganisation.Data;
using DissertationOrganisation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DissertationOrganisation.Services
{
    public class HabitService : IHabitService
    {
        private readonly DatabaseContext _context;
        private readonly IDateTimeService _dateTimeService;

        public HabitService(DatabaseContext context,
                            IDateTimeService dateTimeService)
        {
            _context = context;
            _dateTimeService = dateTimeService;
        }

        public Habit AddHabit(Habit habit)
        {
            _context.Habits.Add(habit);
            _context.SaveChanges();
            return habit;
        }

        public bool DeleteHabit(int id)
        {
            var habit = GetHabit(id);
            _context.Habits.Remove(habit);
            _context.SaveChanges();
            return true;
        }
        public Habit GetHabit(int id)
        {
            return GetHabits().Where(habit => habit.Id == id).FirstOrDefault();
        }

        public List<Habit> GetHabits()
        {
            var habits = _context.Habits.ToList();
            return habits;
        }

        public IEnumerable<TodaysHabits> GetTodaysHabits(DateTime current)
         {
            //Todo getPage Date time? 
           //DateTime current = _dateTimeService.GetCurrentDateTime();

            var todaysHabits = new List<TodaysHabits>(); 
            var habits = _context.Habits.ToList();
            foreach(Habit habit in habits)
            {
                
                var completed = _context.HabitCompletes.ToList();
                var isComplete = completed
                    .Where(x=> x.HabitId == habit.Id)
                    .Where(x => x.Date.Year == current.Year && x.Date.Month == current.Month && x.Date.Day == current.Day)?
                    .LastOrDefault()?.IsComplete ;

                var todayHabit = new TodaysHabits
                {
                    Id = habit.Id,
                    Name = habit.Name,
                    Colour = habit.Colour,
                    IsComplete = isComplete != null ? (bool)isComplete : false 
                };
                //TODO Make compare date functions > < == 
                if (CompareDateLessThanOrEqual(habit.StartDate, current))
                {
                    //if the habit is weekly and todays DAY is the same as one of the days of the habit 
                    //if habit is yearly and the day and montha re the same then we good 
                    //
                    if(habit.EndDate == null || CompareDateGreaterThanOrEqual(habit.EndDate, current))
                    {
                        if (habit.Repeat == Repeat.NoRepeat)
                        {
                            if (CompareDateEquals(habit.StartDate, current))
                            {
                                todaysHabits.Add(todayHabit);
                            }
                        }
                        else if (habit.Repeat == Repeat.Weekly)
                        {
                            var todaysDay = current.DayOfWeek.ToString();
                            if (habit.RepeatDays != null) { 
                                foreach (var repeatDay in GetFlags(habit.RepeatDays))
                                {
                                    if (repeatDay.ToString().Equals(todaysDay))
                                    {
                                        todaysHabits.Add(todayHabit);
                                    }
                                }
                            }
                        }
                        else if (habit.Repeat == Repeat.Yearly)
                        {
                            if(CompareDateYearly(habit.StartDate, current))
                            {
                                todaysHabits.Add(todayHabit);
                            }
                        }
                        else if (habit.Repeat == Repeat.Everyday)
                        {
                            todaysHabits.Add(todayHabit);
                        }
                    }
                }
            }
            return todaysHabits;
        }

        //Move this to an enum service TODO 
        public IEnumerable<Enum> GetFlags(Enum repeatDays)
        {
            foreach (Enum value in Enum.GetValues(repeatDays.GetType()))
                    if (repeatDays.HasFlag(value))
                        yield return value;
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
            if(startDate.Year <= current.Year && startDate.Month <= current.Month)
            {
                if (startDate.Month == current.Month && startDate.Day > current.Day)
                {
                    return false;
                }
                return true; 
            }
            return false; 
        }

        public void UpdateHabit(int id, Habit updatedHabit)
        {
            var habit = GetHabit(id);
            habit.Name = updatedHabit.Name;
            habit.Mesurable = updatedHabit.Mesurable;
            habit.NumberOfBlocks = updatedHabit.NumberOfBlocks;
            habit.Repeat = updatedHabit.Repeat;
            habit.RepeatDays = updatedHabit.RepeatDays;
            habit.RepresentationOfBlocks = updatedHabit.RepresentationOfBlocks;
            habit.StartDate = updatedHabit.StartDate;
            habit.EndDate = updatedHabit.EndDate;
            habit.Colour = updatedHabit.Colour;
            habit.Description = updatedHabit.Description; 
            _context.SaveChanges();
        }

        public HabitComplete UpdateHabitComplete(HabitComplete completeHabit)
        {
            _context.HabitCompletes.Add(completeHabit);
            _context.SaveChanges();
            return completeHabit;
        }
    }
}
