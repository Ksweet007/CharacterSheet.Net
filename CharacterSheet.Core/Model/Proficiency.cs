using CharacterSheet.Core.Enums;

namespace CharacterSheet.Core.Model
{
    public class Proficiency
    {
        public int ProficiencyId { get; set; }
        public ProficiencyTypeId ProficiencytypeId { get; set; }
        public string Name { get; set; }
    }
}
