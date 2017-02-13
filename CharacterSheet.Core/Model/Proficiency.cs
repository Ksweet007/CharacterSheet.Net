using System.Collections.Generic;
using CharacterSheet.Core.Enums;

namespace CharacterSheet.Core.Model
{
    public class Proficiency
    {
        public Proficiency()
        {
            Classes = new HashSet<Class>();
        }

        public int ProficiencyId { get; set; }
        public ProficiencyTypeId ProficiencytypeId { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Class> Classes { get; set; }
    }
}
