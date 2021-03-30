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

        public IEnumerable<TodaysHabits> GetTodaysHabits()
         {

            DateTime current = _dateTimeService.GetCurrentDateTime();

            var todaysHabits = new List<TodaysHabits>(); 
            var habits = _context.Habits.ToList();
            foreach(Habit habit in habits)
            {
               // var completed = _context.HabitCompletes.ToList();
               // var isComplete = completed
               //     .Where(x=> x.HabitId == habit.Id)
               //     .Where(x => x.Date.Year == current.Year && x.Date.Month == current.Month && x.Date.Day == current.Day)
               //     .FirstOrDefault().IsComplete;
                if(habit.StartDate.Year <= current.Year && habit.StartDate.Month <= current.Month && habit.StartDate.Day <= current.Day)
                {
                    if(habit.EndDate == null)
                    {
                        todaysHabits.Add(new TodaysHabits
                        {
                            Id = habit.Id,
                            Name = habit.Name,
                            Description = habit.Description,
                            IsComplete = false //isComplete TODO
                        });
                                            
                    }
                    else
                    {
                        if (habit.EndDate?.Year <= current.Year && habit.EndDate?.Month <= current.Month && habit.EndDate?.Day <= current.Day)
                        {
                            todaysHabits.Add(new TodaysHabits
                            {
                                Id = habit.Id,
                                Name = habit.Name,
                                Description = habit.Description,
                                IsComplete = false //isComplete TODO 
                            });
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
