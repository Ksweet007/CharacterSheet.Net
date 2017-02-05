using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CharacterSheet.Core.Enums;

namespace CharacterSheet.Core.Model
{
    public class ClassSkillAssoc
    {
        public virtual int Id { get; set; }
        public virtual int ClassId { get; set; }
        public virtual int SkillId { get; set; }
    }
}
