using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class IssueImage
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Uri { get; set; } = null!;
        public Guid  IssueId { get; set; }
        public Issue Issue { get; set; } = null!;
    }
}
