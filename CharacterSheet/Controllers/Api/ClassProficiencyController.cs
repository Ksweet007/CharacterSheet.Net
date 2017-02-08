using System.Collections.Generic;
using System.Linq;
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
            var clsSkills = _characterClassRepository.GetClassSkills(classId);
            var clsProficiencies = _characterClassRepository.GetClassProficiencies(classId);
            
            var mappedClass = new NewClassDTO
            {
                ClassSkills = clsSkills,
                Proficiencies = clsProficiencies
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
