using Application.Dtos;
using Application.Services.Interfaces;
using Application.UseCases.AddModeratorRoles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {

    }
}
