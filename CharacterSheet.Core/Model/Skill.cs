using System.Collections.Generic;

namespace CharacterSheet.Core.Model
{
    public class Skill
    {
        public Skill()
        {
            Classes = new HashSet<Class>();
        }
        public int skillId { get; set; }
        public string Name { get; set; }
        public int AbilityScoreId { get; set; }
        public virtual AbilityScore AbilityScore { get; set; }
        public virtual ICollection<Class> Classes { get; set; }
    }
}
