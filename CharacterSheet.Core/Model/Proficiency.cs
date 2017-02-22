using System.Collections.Generic;
using CharacterSheet.Core.Enums;

namespace CharacterSheet.Core.Model
{
    public class Proficiency
    {
        public Proficiency()
        {
            Classes = new HashSet<Class>();
            Weapon = new HashSet<Weapon>();
        }

        public int ProficiencyId { get; set; }
        public int ProficiencytypeId { get; set; }
        public string Name { get; set; }
        public virtual ProficiencyType ProficiencyType { get; set; }
        public virtual ICollection<Class> Classes { get; set; }
        public virtual ICollection<Weapon> Weapon { get; set; }
    }
}
