using System.Collections.Generic;
using CharacterSheet.Core.Enums;

namespace CharacterSheet.Core.Model
{
    public class ClassProficiencyTypeAssoc
    {
        public virtual int ClassId { get; set; }
        public virtual ProficiencyTypeValues ProficiencyType { get; set; }
    }
}
