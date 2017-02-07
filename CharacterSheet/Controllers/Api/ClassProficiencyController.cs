using System.Collections.Generic;
using System.Web.Http;
using CharacterSheet.Core.Model;
using CharacterSheet.Core.Model.DTO;
using CharacterSheet.Infrastructure.Data;

namespace CharacterSheet.Controllers.Api
{
    public class ClassProficiencyController : ApiController
    {
        private readonly CharacterClassRepository _characterClassRepository;
        
        public ClassProficiencyController()
        {
            _characterClassRepository = new CharacterClassRepository();
        }

        [HttpGet]
        [Route("api/GetClassProficiencies/{classId}")]
        public IHttpActionResult GetSheetFields(int classId)
        {
            var cls = _characterClassRepository.GetClassById(classId);
            var allSkills = _characterClassRepository.GetAllSkills();
            var proficiencyList = _characterClassRepository.GetAllProfs();

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
                ClassSkills = cls.Skills,
                Proficiencies = proficiencyList
            };

            return Ok(mappedClass);
        }

        [HttpPut]
        [Route("api/AddProficiencies")]
        public IHttpActionResult AddNewProficiencies(IList<Proficiency> profsToAdd)
        {
            foreach (var item in profsToAdd)
            {
                _characterClassRepository.AddProficiency(item);
            }

            return Ok(profsToAdd);
        }


    }
}
