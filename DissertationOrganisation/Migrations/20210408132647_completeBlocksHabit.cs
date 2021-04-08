using Microsoft.EntityFrameworkCore.Migrations;

namespace DissertationOrganisation.Migrations
{
    public partial class completeBlocksHabit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompleteBlocks",
                table: "HabitCompletes",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompleteBlocks",
                table: "HabitCompletes");
        }
    }
}
