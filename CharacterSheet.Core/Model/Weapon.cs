using System.Collections.Generic;

namespace CharacterSheet.Core.Model
{
    public class Weapon
    {
        public int WeaponId { get; set; }
        public string Name { get; set; }
        public string Cost { get; set; }
        public string DamageDie { get; set; }
        public string DamageDieCount { get; set; }
        public string Weight { get; set; }
        public int PropertyId { get; set; }
        public int ProficiencyId { get; set; }

        //public virtual Proficiency Proficiencies { get; set; }

        public virtual WeaponProperty WeaponProperty { get; set; }
    }
}
