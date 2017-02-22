using CharacterSheet.Core.Enums;

namespace CharacterSheet.Core.Model
{
    public class Armor
    {
        public int Id { get; set; }        
        public int ProficiencyId { get; set; }
        public string Name { get; set; }
        public string Cost { get; set; }
        public string ArmorClass { get; set; }
        public string Strength { get; set; }
        public bool Stealth { get; set; }
        public string Weight { get; set; }
    }
}
