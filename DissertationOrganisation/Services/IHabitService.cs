using DissertationOrganisation.Models;
using System;
using System.Collections.Generic;

namespace DissertationOrganisation.Services
{

    public interface IHabitService
        {

        public List<Habit> GetHabits();

        public Habit GetHabit(int id);

        public Habit AddHabit(Habit habit);
      
        public void UpdateHabit(int id, Habit updatedHabit);
        
        public bool DeleteHabit(int id);

        IEnumerable<TodaysHabits> GetTodaysHabits();
    }
}
