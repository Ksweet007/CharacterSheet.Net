using System.Collections.Generic;
using CharacterSheet.Core.Enums;

namespace CharacterSheet.Core.Model
{
    public class Proficiency
    {
        public Proficiency()
        {
            Armors = new HashSet<Armor>();
            Classes = new HashSet<Class>();
        }

        public int ProficiencyId { get; set; }
        public int ProficiencytypeId { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Armor> Armors { get; set; }
        public virtual ProficiencyType ProficiencyType { get; set; }
        public virtual ICollection<Class> Classes { get; set; }
    }
}
