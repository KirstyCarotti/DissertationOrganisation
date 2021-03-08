using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DissertationOrganisation.Models
{
    public class ListItem
    {
        public int Id { get; set; }
        public int ListId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<ListSubItem> ListSubItems { get; set; }
        public ListItemState State { get; set; }

    }
}
