using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases.AddModeratorRoles
{
    public record AddModeratorCategoriesRequest([EmailAddress]string Email, IEnumerable<Guid> CategoryIds);
}
