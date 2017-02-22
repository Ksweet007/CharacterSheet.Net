using CharacterSheet.Core.Enums;

namespace CharacterSheet.Core.Model
{
    public class Armor
    {
        public int Id { get; set; }
        public ProfTypeId ProficiencyId { get; set; } //this replaces Proficiencies since Armor will be attached to a single instance of Prof. Let the code drive the DB model.
        public string Name { get; set; }
        public string Cost { get; set; }
        public string ArmorClass { get; set; }
        public string Strength { get; set; }
        public bool Stealth { get; set; }
        public string Weight { get; set; }
    }
}
