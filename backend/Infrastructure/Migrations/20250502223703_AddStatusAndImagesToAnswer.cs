using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddStatusAndImagesToAnswer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StatusHistories");

            migrationBuilder.DropColumn(
                name: "UpdatePhotoUrl",
                table: "Answers");

            migrationBuilder.AddColumn<int>(
                name: "NewStatus",
                table: "Answers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OldStatus",
                table: "Answers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "AnswerImage",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Uri = table.Column<string>(type: "text", nullable: false),
                    AnswerId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnswerImage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnswerImage_Answers_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "Answers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnswerImage_AnswerId",
                table: "AnswerImage",
                column: "AnswerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnswerImage");

            migrationBuilder.DropColumn(
                name: "NewStatus",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "OldStatus",
                table: "Answers");

            migrationBuilder.AddColumn<string>(
                name: "UpdatePhotoUrl",
                table: "Answers",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "StatusHistories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ChangedByModeratorId = table.Column<Guid>(type: "uuid", nullable: false),
                    IssueId = table.Column<Guid>(type: "uuid", nullable: false),
                    ChangedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    NewStatus = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    OldStatus = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatusHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StatusHistories_AspNetUsers_ChangedByModeratorId",
                        column: x => x.ChangedByModeratorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StatusHistories_Issues_IssueId",
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
                name: "IX_StatusHistories_IssueId",
                table: "StatusHistories",
                column: "IssueId");
        }
    }
}
