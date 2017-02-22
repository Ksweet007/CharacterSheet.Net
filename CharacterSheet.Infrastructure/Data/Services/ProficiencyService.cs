using System.Collections.Generic;
using System.Linq;
using CharacterSheet.Core.Enums;
using CharacterSheet.Core.Model;
using CharacterSheet.Core.Model.DTO;
using CharacterSheet.Infrastructure.Data;

namespace CharacterSheet.Infrastructure
{
    public class ProficiencyService
    {
        private readonly CharacterClassRepository _characterClassRepository;

        public ProficiencyService()
        {
            _characterClassRepository = new CharacterClassRepository();
        }



        public IList<Skill> GetClassSkillsById(int classId)
        {
            return  _characterClassRepository.GetClassSkills(classId);
        }

        public ClassSkillViewModel GetClassSkillsAndAllSkills(int classId)
        {
            var clsSkills = classId > 0 ? _characterClassRepository.GetClassSkills(classId) : new List<Skill>();
            var allSkills = _characterClassRepository.GetAllSkills();

            return new ClassSkillViewModel
            {
                ClassSkills = clsSkills,
                AllSkills = allSkills
            };
        }


    }
}
