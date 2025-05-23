﻿using Domain.Entities;

namespace Application.UseCases.GetAllIssues
{
    public record GetAllIssueResponse(
        Guid Id, string Title, string Category, IssueStatus Status, 
        string Image, IEnumerable<double> Coords,
        bool? Like, int LikeCount, int DislikeCount); 
}
