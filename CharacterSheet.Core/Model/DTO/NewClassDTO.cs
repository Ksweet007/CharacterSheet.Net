using System.Collections.Generic;
using CharacterSheet.Core.Enums;

namespace CharacterSheet.Core.Model.DTO
{
    public class NewClassDTO
    {
        public int classId { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string primaryability { get; set; }
        public string hitdieperlevel { get; set; }
        public string hpatfirstlevel { get; set; }
        public string hpathigherlevels { get; set; }
        public IList<Skill> skills { get; set; }
        public IList<Skill> ClassSkills { get; set; }
        public IList<ProficiencyTypeValues> Proficiencies { get; set; }

    }
}
