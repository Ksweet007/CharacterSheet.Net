using System.Collections.Generic;
using System.Web.Http;
using CharacterSheet.Core.Interfaces;
using CharacterSheet.Core.Model;


namespace CharacterSheet.Controllers.Api
{
    public class ClassController : ApiController
    {

        private readonly ICharacterClassRepository _characterClassRepository;

        public ClassController(ICharacterClassRepository characterClassRepository)
        {
            _characterClassRepository = characterClassRepository;
        }
       
        [HttpGet]
        [Route("api/GetClassList")]
        public IHttpActionResult GetClassList()
        {
            return Ok(_characterClassRepository.GetClassList());
        }
        
        [HttpPost]
        [Route("api/EditClass")]
        public IHttpActionResult EditClass([FromBody]string value)
        {
            return Ok();
        }

        [HttpPut]
        [Route("api/AddClass")]
        public IHttpActionResult AddNewClass(Class classToAdd)
        {
            var addedClass = _characterClassRepository.CreateClass(classToAdd);

            return Ok(addedClass);
        }

        [HttpPut]
        [Route("api/AddClassList")]
        public IHttpActionResult AddNewClassList(IList<Class> classesToAdd)
        {
            foreach (var item in classesToAdd)
            {
                _characterClassRepository.CreateClass(item);
            }

            return Ok(classesToAdd);
        }

        [HttpDelete]
        [Route("api/DeleteClass")]
        public IHttpActionResult Delete(int id)
        {
            return Ok();
        }
    }
}