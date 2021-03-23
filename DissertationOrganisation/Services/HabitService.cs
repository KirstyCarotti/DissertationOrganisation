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

        public HabitService(DatabaseContext context)
        {
            _context = context;
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

        public void UpdateHabit(int id, Habit updatedHabit)
        {
            throw new NotImplementedException();
        }

        /*
public List<User> GetUsers()
{
//return _context.Lists.ToList(); 
}

public User GetUser(int id)
{
//return GetUsers().Where(user => user.Id == id).FirstOrDefault(); 
}

public User AddUser(User user)
{
_context.Users.Add(user);
_context.SaveChanges();
return user;
}

public void UpdateUser(int id, User updatedUser)
{
var user = GetUser(id);
user.Name = updatedUser.Name; 
_context.SaveChanges(); 

}

public bool DeleteUser(int id)
{
var user = GetUser(id);
_context.Users.Remove(user);
_context.SaveChanges(); 
return true; 
}*/


    }
}
