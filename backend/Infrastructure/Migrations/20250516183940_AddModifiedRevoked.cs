using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddModifiedRevoked : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ModifiedById",
                table: "Issues",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "Issues",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "RevokedById",
                table: "Issues",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RevokedOn",
                table: "Issues",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Issues_ModifiedById",
                table: "Issues",
                column: "ModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_Issues_RevokedById",
                table: "Issues",
                column: "RevokedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Issues_AspNetUsers_ModifiedById",
                table: "Issues",
                column: "ModifiedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Issues_AspNetUsers_RevokedById",
                table: "Issues",
                column: "RevokedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Issues_AspNetUsers_ModifiedById",
                table: "Issues");

            migrationBuilder.DropForeignKey(
                name: "FK_Issues_AspNetUsers_RevokedById",
                table: "Issues");

            migrationBuilder.DropIndex(
                name: "IX_Issues_ModifiedById",
                table: "Issues");

            migrationBuilder.DropIndex(
                name: "IX_Issues_RevokedById",
                table: "Issues");

            migrationBuilder.DropColumn(
                name: "ModifiedById",
                table: "Issues");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "Issues");

            migrationBuilder.DropColumn(
                name: "RevokedById",
                table: "Issues");

            migrationBuilder.DropColumn(
                name: "RevokedOn",
                table: "Issues");
        }
    }
}
