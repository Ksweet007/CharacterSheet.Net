using System.Collections.Generic;

namespace CharacterSheet.Core.Model
{
    public sealed class ProficiencyType
    {
        public ProficiencyType()
        {
            Proficiencies = new HashSet<Proficiency>();
            Classes = new HashSet<Class>();
        }

        public int ProficiencyTypeId { get; set; }
        public string Name { get; set; }
        public ICollection<Proficiency> Proficiencies { get; set; }
        public ICollection<Class> Classes { get; set; }
    }
}
