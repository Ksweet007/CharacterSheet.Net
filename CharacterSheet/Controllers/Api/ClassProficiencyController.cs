using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure;
using CharacterSheet.Infrastructure.Data;

namespace CharacterSheet.Controllers.Api
{
    
    public class ClassProficiencyController : BaseApiController
    {
        private readonly CharacterClassRepository _characterClassRepository;
        private readonly ProficiencyService _proficiencyService;

        public ClassProficiencyController()
        {
            _characterClassRepository = new CharacterClassRepository();
            _proficiencyService = new ProficiencyService();
        }

        [HttpGet]
        [Route("api/GetAllProficiencies")]
        public IHttpActionResult GetAllProficiencies()
        {
            var allProfs = _characterClassRepository.GetAllProfs();

            return Ok(allProfs);
        }

        [HttpGet]
        [Route("api/GetAllProficiencyTypes")]
        public IHttpActionResult GetAllProficiencyTypes()
        {
            var allProfTypes = _characterClassRepository.GetallProficiencyTypes();

            return Ok(allProfTypes);
        }

        [HttpGet]
        [Route("api/GetAllSkills")]
        public IHttpActionResult GetAllSkills()
        {
            var allSkills = _characterClassRepository.GetAllSkills();

            return Ok(allSkills);
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
        [Route("api/AddProficiency")]
        public IHttpActionResult AddNewProficiency(Proficiency proficiencyToAdd)
        {
            _characterClassRepository.AddProficiency(proficiencyToAdd);

            return Ok(proficiencyToAdd);
        }

        [HttpDelete]
        [Route("api/RemoveProficiency/{proficiencyId}")]
        public IHttpActionResult RemoveProficiency(int proficiencyId)
        {
            _characterClassRepository.RemoveProficiency(proficiencyId);

            return Ok();
        }

        [HttpPut]
        [Route("api/AddProficiencies")]
        public IHttpActionResult AddNewProficiencies(IList<Proficiency> profsToAdd)
        {
            var itemsToAdd = profsToAdd.Where(item => item.ProficiencyId == 0).ToList();

            _characterClassRepository.AddProficiencyList(itemsToAdd);

            return Ok(profsToAdd);
        }

        [HttpPut]
        [Route("api/AddSkills/{classId}")]
        public IHttpActionResult AddSkillList(IList<Skill> skills, int classId)
        {
            foreach (var item in skills)
            {
                _characterClassRepository.AddSkillList(item, classId);
            }
            
            return Ok(skills);
        }

    }
}
