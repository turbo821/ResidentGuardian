using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddGrades : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnswerImage_Answers_AnswerId",
                table: "AnswerImage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AnswerImage",
                table: "AnswerImage");

            migrationBuilder.RenameTable(
                name: "AnswerImage",
                newName: "AnswerImages");

            migrationBuilder.RenameIndex(
                name: "IX_AnswerImage_AnswerId",
                table: "AnswerImages",
                newName: "IX_AnswerImages_AnswerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnswerImages",
                table: "AnswerImages",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Grades",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    IssueId = table.Column<Guid>(type: "uuid", nullable: false),
                    Like = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grades", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Grades_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Grades_Issues_IssueId",
                        column: x => x.IssueId,
                        principalTable: "Issues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Grades_IssueId",
                table: "Grades",
                column: "IssueId");

            migrationBuilder.CreateIndex(
                name: "IX_Grades_UserId",
                table: "Grades",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AnswerImages_Answers_AnswerId",
                table: "AnswerImages",
                column: "AnswerId",
                principalTable: "Answers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnswerImages_Answers_AnswerId",
                table: "AnswerImages");

            migrationBuilder.DropTable(
                name: "Grades");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AnswerImages",
                table: "AnswerImages");

            migrationBuilder.RenameTable(
                name: "AnswerImages",
                newName: "AnswerImage");

            migrationBuilder.RenameIndex(
                name: "IX_AnswerImages_AnswerId",
                table: "AnswerImage",
                newName: "IX_AnswerImage_AnswerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnswerImage",
                table: "AnswerImage",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AnswerImage_Answers_AnswerId",
                table: "AnswerImage",
                column: "AnswerId",
                principalTable: "Answers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
