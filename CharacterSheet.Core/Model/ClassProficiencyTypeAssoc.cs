using CharacterSheet.Core.Enums;

namespace CharacterSheet.Core.Model
{
    public class ClassProficiencyTypeAssoc
    {
        public Class Class { get; set; }
        public ProficiencyTypeValues ProficiencyType { get; set; }
    }
}
