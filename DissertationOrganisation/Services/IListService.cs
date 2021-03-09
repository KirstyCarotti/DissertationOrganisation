using DissertationOrganisation.Models;
using System.Collections.Generic;

namespace DissertationOrganisation.Services
{

    public interface IListService
        {

        public List<List> GetLists();

        public List GetList(int id);

        public User AddList(List list);
      
        public void UpdateList(int id, List updatedList);
        
        public bool DeleteList(int id);
        void UpdateListItem(int id, ListItem listItem);
        object AddListItem(ListItem list);
        void DeleteListItem(int id);
    }
}
