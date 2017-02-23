using System.Collections.Generic;
using CharacterSheet.Core.Enums;

namespace CharacterSheet.Core.Model
{
    public class Proficiency
    {
        public Proficiency()
        {
            Weapons = new HashSet<Weapon>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public ProficiencyTypeId ProficiencyTypeId { get; set; }
        public virtual ICollection<Weapon> Weapons { get; set; } 
    }
}
