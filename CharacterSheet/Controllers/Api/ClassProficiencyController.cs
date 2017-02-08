using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using CharacterSheet.Core.Enums;
using CharacterSheet.Core.Model;
using CharacterSheet.Core.Model.DTO;
using CharacterSheet.Infrastructure;
using CharacterSheet.Infrastructure.Data;

namespace CharacterSheet.Controllers.Api
{
    public class ClassProficiencyController : ApiController
    {
        private readonly CharacterClassRepository _characterClassRepository;
        private readonly ProficiencyService _proficiencyService;

        public ClassProficiencyController()
        {
            _characterClassRepository = new CharacterClassRepository();
            _proficiencyService = new ProficiencyService();
        }

        [HttpGet]
        [Route("api/GetClassProficiencies/{classId}")]
        public IHttpActionResult GetClassProficiencyList(int classId)
        {
            var classProficiencies = _proficiencyService.GetProficienciesByClassId(classId);

            return Ok(classProficiencies);
        }

        [HttpGet]
        [Route("api/GetClassSkills/{classId}")]
        public IHttpActionResult GetClassSkillList(int classId)
        {
            var skills = _proficiencyService.GetClassSkillsById(classId);

            return Ok(skills);
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
