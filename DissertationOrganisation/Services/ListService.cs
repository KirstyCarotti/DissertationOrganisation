using DissertationOrganisation.Data;
using DissertationOrganisation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DissertationOrganisation.Services
{
    public class ListService : IListService
    {
        private readonly DatabaseContext _context; 

        public ListService(DatabaseContext context)
        {
            _context = context; 
        }

        public User AddList(List list)
        {
            throw new NotImplementedException();
        }

        public object AddListItem(ListItem listItem)
        {
            listItem.State = ListItemState.Incomplete;
            _context.ListItems.Add(listItem);
            _context.SaveChanges();
            return listItem;
        }

        public bool DeleteList(int id)
        {
            throw new NotImplementedException();
        }

        public void DeleteListItem(int id)
        {
            var item = _context.ListItems.Where(x => x.Id == id).FirstOrDefault();
            _context.ListItems.Remove(item);
            _context.SaveChanges();
        }

        public List GetList(int id)
        {
            return GetLists().Where(list => list.Id == id).FirstOrDefault();
        }

        public List<List> GetLists()
        {
            var lists = _context.Lists.ToList();
            foreach (List list in lists)
            {
                list.ListItems = _context.ListItems.Where(listItems => listItems.ListId == list.Id).ToList();
            }
            return lists;
        }

        public void UpdateList(int id, List updatedList)
        {
            throw new NotImplementedException();
        }

        public void UpdateListItem(int id, ListItem listItem)
        {
            var currentListItem = _context.ListItems.Where(listItem => listItem.Id == id).FirstOrDefault();

            currentListItem.State = listItem.State;
            currentListItem.Title = listItem.Title;
            currentListItem.Description = listItem.Description;

            _context.SaveChanges(); 
            //TODO Write rest of update 

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
