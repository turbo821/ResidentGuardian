using System.ComponentModel;

namespace Domain.Entities
{
    public enum IssueStatus
    {
        [Description("Pending")]
        Pending = 0,
        [Description("In progress")]
        InProgress = 1,
        [Description("Resolved")]
        Resolved = 2,
        [Description("Rejected")]
        Rejected = 3
    }
}
