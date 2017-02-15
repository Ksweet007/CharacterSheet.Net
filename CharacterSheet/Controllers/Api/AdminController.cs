using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CharacterSheet.Infrastructure.Data;

namespace CharacterSheet.Controllers.Api
{
    public class AdminController : BaseApiController
    {
        private readonly CharacterClassRepository _characterClassRepository;

        public AdminController()
        {
            _characterClassRepository = new CharacterClassRepository();
        }

        [HttpGet]
        [Route("api/IsAdmin")]
        public IHttpActionResult IsUserAdmin()
        {
            var isAdmin = CurrentUser.IsInRole("Admin");

            return Ok(isAdmin);
        }

        [HttpGet]
        [Route("api/GetUserName")]
        public IHttpActionResult GetUserName()
        {
            var userName = CurrentUser.Name;

            return Ok(userName);
        }
    }
}
