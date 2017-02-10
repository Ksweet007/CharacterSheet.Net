using System.Collections.Generic;
using System.Web.Http;
using CharacterSheet.Core.Model;
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
            var clsSkills = _proficiencyService.GetClassSkillsAndAllSkills(classId);   

            return Ok(clsSkills);
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
