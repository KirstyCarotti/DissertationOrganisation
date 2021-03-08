using Microsoft.EntityFrameworkCore.Migrations;

namespace DissertationOrganisation.Migrations
{
    public partial class ListMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ListItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ListId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ListItems_Lists_ListId",
                        column: x => x.ListId,
                        principalTable: "Lists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ListSubItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ListItemId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListSubItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ListSubItems_ListItems_ListItemId",
                        column: x => x.ListItemId,
                        principalTable: "ListItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ListItems_ListId",
                table: "ListItems",
                column: "ListId");

            migrationBuilder.CreateIndex(
                name: "IX_ListSubItems_ListItemId",
                table: "ListSubItems",
                column: "ListItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ListSubItems");

            migrationBuilder.DropTable(
                name: "ListItems");

            migrationBuilder.DropTable(
                name: "Lists");
        }
    }
}
