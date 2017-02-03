using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CharacterSheet.Models;
using CharacterSheet.Repositories;

namespace CharacterSheet.Controllers.Api
{
    public class ClassController : ApiController
    {
        private readonly ClassRepository _classRepo;

        public ClassController()
        {
            _classRepo = new ClassRepository();
        }
        
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        public string Get(int id)
        {
            return "value";
        }
        
        public void Post([FromBody]string value)
        {
        }

        [HttpPut]
        [Route("api/AddClass")]
        public IHttpActionResult AddNewClass(Class classToAdd)
        {
            var addedClass = _classRepo.CreateClass(classToAdd);

            return Ok(addedClass);
        }

        public IHttpActionResult AddNewClassList(IList<Class> classesToAdd)
        {
            foreach(var item in classesToAdd)
            {
                var addedClass = _classRepo.CreateClass(item);
            }

            return Ok(classesToAdd);
        }

        public void Delete(int id)
        {
        }
    }
}