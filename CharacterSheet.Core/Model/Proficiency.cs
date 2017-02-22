using CharacterSheet.Core.Enums;

namespace CharacterSheet.Core.Model
{
    public class Proficiency
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ProficiencyTypeId ProficiencyTypeId { get; set; }
    }
}
