using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CharacterSheet.Core.Enums;

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
        public virtual ICollection<Class> Classes { get; set; }
        public virtual AbilityScore AbilityScore { get; set; }
    }
}
