using System.Collections.Generic;

namespace CharacterSheet.Core.Model
{
    public class AbilityScore
    {
        public AbilityScore()
        {
            Skills = new HashSet<Skill>();
        }

        public int AbilityScoreId { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Skill> Skills { get; set; }

    }
}
