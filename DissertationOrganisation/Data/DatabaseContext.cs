using DissertationOrganisation.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace DissertationOrganisation.Data
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<List> Lists { get; set; }
        public DbSet<ListItem> ListItems { get; set; }
        public DbSet<ListSubItem> ListSubItems { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Habit> Habits { get; set; }
        public DbSet<HabitComplete> HabitCompletes { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        { }
    }


}


