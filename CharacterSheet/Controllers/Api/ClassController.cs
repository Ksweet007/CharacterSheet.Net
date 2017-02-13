using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using CharacterSheet.Core.Model;
using CharacterSheet.Core.Model.DTO;
using CharacterSheet.Infrastructure.Data;

namespace CharacterSheet.Controllers.Api
{
    
    public class ClassController : BaseApiController
    {

        private readonly CharacterClassRepository _characterClassRepository;
        
        public ClassController()
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
        [Route("api/GetClassList")]
        public IHttpActionResult GetClassList()
        {
            return Ok(_characterClassRepository.GetClassList());
        }

        [HttpGet]
        [Route("api/GetClass/{classId}")]
        public IHttpActionResult GetClass(int classId)
        {
            return Ok(_characterClassRepository.GetClassById(classId));
        }


        [HttpGet]
        [Route("api/GetClassDetails/{classId}")]
        public IHttpActionResult GetClassDetails(int classId)
        {
            var cls = _characterClassRepository.GetClassById(classId);
            
            var mappedClass = new NewClassDTO
            {
                classId = cls.classId,
                name = cls.name,
                description = cls.description,
                primaryability = cls.primaryability,
                hitdieperlevel = cls.hitdieperlevel,
                hpatfirstlevel = cls.hpatfirstlevel,
                hpathigherlevels = cls.hpathigherlevels,
            };

            return Ok(mappedClass);
        }

        [HttpGet]
        [Route("api/GetSheetFields/{classId}")]
        public IHttpActionResult GetSheetFields(int classId)
        {
            var cls = _characterClassRepository.GetClassById(classId);
            var allSkills = _characterClassRepository.GetAllSkills();
            
            var mappedClass = new NewClassDTO
            {
                classId = cls.classId,
                name = cls.name,
                description = cls.description,
                primaryability = cls.primaryability,
                hitdieperlevel = cls.hitdieperlevel,
                hpatfirstlevel = cls.hpatfirstlevel,
                hpathigherlevels = cls.hpathigherlevels,
                skills = allSkills,
                ClassSkills = cls.Skills.ToList(),
                Proficiencies = cls.Proficiencies.ToList()
            };

            return Ok(mappedClass);
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




    }
}