using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharacterSheet.Core.Model.DTO
{
    public class ClassSkillViewModel
    {
        public virtual IList<Skill> ClassSkills { get; set; }
        public virtual IList<Skill> AllSkills { get; set; }
    }
}
