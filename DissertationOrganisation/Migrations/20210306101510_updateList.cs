using Microsoft.EntityFrameworkCore.Migrations;

namespace DissertationOrganisation.Migrations
{
    public partial class updateList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ListName",
                table: "Lists",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ListName",
                table: "Lists");
        }
    }
}
