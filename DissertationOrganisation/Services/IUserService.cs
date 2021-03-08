using DissertationOrganisation.Models;
using System.Collections.Generic;

namespace DissertationOrganisation.Services
{

    public interface IUserService
        {

        public List<User> GetUsers();

        public User GetUser(int id);

        public User AddUser(User user);
      
        public void UpdateUser(int id, User updatedUser);
        
        public bool DeleteUser(int id);
    }
}
