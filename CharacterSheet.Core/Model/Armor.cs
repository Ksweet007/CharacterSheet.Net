namespace CharacterSheet.Core.Model
{
    public class Armor
    {
        public int ArmorId { get; set; }
        public int ArmorProficiencyId { get; set; }
        public string Name { get; set; }
        public string Cost { get; set; }
        public string ArmorClass { get; set; }
        public string Strength { get; set; }
        public string Stealth { get; set; }
        public string Weight { get; set; }
        public virtual Proficiency Proficiency { get; set; }
    }
}
