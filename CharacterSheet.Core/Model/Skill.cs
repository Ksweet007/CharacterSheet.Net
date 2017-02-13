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
        public string name { get; set; }
        public int AbilityScoreId { get; set; }
        public virtual AbilityScore AbilityScore { get; set; }
        public ICollection<Class> Classes { get; set; }
    }
}
