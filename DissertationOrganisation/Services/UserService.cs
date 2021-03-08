using DissertationOrganisation.Data;
using DissertationOrganisation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DissertationOrganisation.Services
{
    public class UserService : IUserService
    {
        private readonly DatabaseContext _context; 

        public UserService(DatabaseContext context)
        {
            _context = context; 
        }

        public List<User> GetUsers()
        {
            return _context.Users.ToList(); 
        }

        public User GetUser(int id)
        {
            return GetUsers().Where(user => user.Id == id).FirstOrDefault(); 
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
        }


    }
}
