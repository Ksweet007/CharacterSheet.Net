using System.Collections.Generic;

namespace CharacterSheet.Core.Model.DTO
{
    public class ClassProficiencyViewModel
    {
        public IList<Proficiency> AllClassProficiencies { get; set; }
        public IList<Proficiency> ArmorProficiencies { get; set; }
        public IList<Proficiency> WeaponProficiencies { get; set; }
        public IList<Proficiency> ToolProficiencies { get; set; }
        public IList<Proficiency> SaveProficiencies { get; set; }
    }
}
