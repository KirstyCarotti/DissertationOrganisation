using Microsoft.EntityFrameworkCore.Migrations;

namespace DissertationOrganisation.Migrations
{
    public partial class ListItemState : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "State",
                table: "ListSubItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "State",
                table: "ListItems",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "State",
                table: "ListSubItems");

            migrationBuilder.DropColumn(
                name: "State",
                table: "ListItems");
        }
    }
}
