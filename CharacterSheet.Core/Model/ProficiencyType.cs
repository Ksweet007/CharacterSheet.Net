using System.Collections.Generic;

namespace CharacterSheet.Core.Model
{
    public sealed class ProficiencyType
    {
        public ProficiencyType()
        {
            Proficiencies = new HashSet<Proficiency>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Proficiency> Proficiencies { get; set; }
    }
}
