using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DissertationOrganisation.Models
{
    public class ListSubItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int ListItemId { get; set; }
        public ListItemState State { get; set; }
    }
}
