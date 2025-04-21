using System.ComponentModel;

namespace Domain.Entities
{
    public enum IssueStatus
    {
        [Description("На рассмотрении")]
        Pending = 0,
        [Description("В работе")]
        InProgress = 1,
        [Description("Решено")]
        Resolved = 2,
        [Description("Отклонено")]
        Rejected = 3
    }
}
