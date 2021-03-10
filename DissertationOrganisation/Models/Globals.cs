using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DissertationOrganisation.Models
{
    public static class Globals
    {
        private static DateTime pageDateTime;

        public static DateTime GetPageDateTime()
        {
            return pageDateTime;
        }

        public static void SetPageDateTime(DateTime value)
        {
            pageDateTime = value;
        }
    }
}
