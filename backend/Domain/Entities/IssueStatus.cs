using System.ComponentModel;

namespace Domain.Entities
{
    public enum IssueStatus
    {
        [Description("На рассмотрении")]
        Pending,
        [Description("В работе")]
        InProgress,
        [Description("Решено")]
        Resolved,
        [Description("Отклонено")]
        Rejected
    }
}
