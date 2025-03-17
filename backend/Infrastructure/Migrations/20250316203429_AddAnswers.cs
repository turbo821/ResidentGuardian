using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddAnswers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StatusHistories_AspNetUsers_ChangedByUserId",
                table: "StatusHistories");

            migrationBuilder.DropIndex(
                name: "IX_StatusHistories_ChangedByUserId",
                table: "StatusHistories");

            migrationBuilder.DropColumn(
                name: "ChangedByUserId",
                table: "StatusHistories");

            migrationBuilder.AddColumn<Guid>(
                name: "ChangedByModeratorId",
                table: "StatusHistories",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AnswerId",
                table: "Issues",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IssueId = table.Column<Guid>(type: "uuid", nullable: false),
                    ModeratorId = table.Column<Guid>(type: "uuid", nullable: false),
                    UpdatePhotoUrl = table.Column<string>(type: "text", nullable: true),
                    Text = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answers_AspNetUsers_ModeratorId",
                        column: x => x.ModeratorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Answers_Issues_IssueId",
                        column: x => x.IssueId,
                        principalTable: "Issues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StatusHistories_ChangedByModeratorId",
                table: "StatusHistories",
                column: "ChangedByModeratorId");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_IssueId",
                table: "Answers",
                column: "IssueId");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_ModeratorId",
                table: "Answers",
                column: "ModeratorId");

            migrationBuilder.AddForeignKey(
                name: "FK_StatusHistories_AspNetUsers_ChangedByModeratorId",
                table: "StatusHistories",
                column: "ChangedByModeratorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StatusHistories_AspNetUsers_ChangedByModeratorId",
                table: "StatusHistories");

            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropIndex(
                name: "IX_StatusHistories_ChangedByModeratorId",
                table: "StatusHistories");

            migrationBuilder.DropColumn(
                name: "ChangedByModeratorId",
                table: "StatusHistories");

            migrationBuilder.DropColumn(
                name: "AnswerId",
                table: "Issues");

            migrationBuilder.AddColumn<Guid>(
                name: "ChangedByUserId",
                table: "StatusHistories",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StatusHistories_ChangedByUserId",
                table: "StatusHistories",
                column: "ChangedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_StatusHistories_AspNetUsers_ChangedByUserId",
                table: "StatusHistories",
                column: "ChangedByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
