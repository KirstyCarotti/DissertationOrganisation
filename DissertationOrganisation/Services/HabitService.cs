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
            throw new NotImplementedException();
        }

        public bool DeleteHabit(int id)
        {
            throw new NotImplementedException();
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

        public IEnumerable<Habit> GetTodaysHabits()
         {

            DateTime current = _dateTimeService.GetCurrentDateTime();

            var todaysHabits = new List<Habit>(); 
            var habits = _context.Habits.ToList();
            foreach(Habit habit in habits)
            {
                if(habit.StartDate.Year <= current.Year && habit.StartDate.Month <= current.Month && habit.StartDate.Day <= current.Day)
                {
                    if(habit.EndDate == null)
                    {
                        todaysHabits.Add(habit);
                    }
                    else
                    {
                        if (habit.EndDate?.Year <= current.Year && habit.EndDate?.Month <= current.Month && habit.EndDate?.Day <= current.Day)
                        {
                            todaysHabits.Add(habit);
                        }
                    }
                }
            }
            return todaysHabits;
        }

        public void UpdateHabit(int id, Habit updatedHabit)
        {
            throw new NotImplementedException();
        }

    }
}
