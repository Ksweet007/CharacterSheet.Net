using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharacterSheet.Core.Model
{
    public class AbilityScore
    {
        public AbilityScore()
        {
            Skill = new Skill();
        }

        public int AbilityScoreId { get; set; }
        public string Name { get; set; }
        public virtual Skill Skill { get; set; }


    }
}
