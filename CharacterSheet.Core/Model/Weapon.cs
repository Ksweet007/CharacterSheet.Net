using System.Collections.Generic;

namespace CharacterSheet.Core.Model
{
    public class Weapon
    {
        public Weapon()
        {
            WeaponProperties = new HashSet<WeaponProperty>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Cost { get; set; }
        public int DamageDie { get; set; }
        public int DamageDieCount { get; set; }
        public string Weight { get; set; }
        public int ProficiencyId { get; set; }     
        public virtual Proficiency Proficiency { get; set; }
        public string ProficiencyName => Proficiency?.Name;
        public virtual ICollection<WeaponProperty> WeaponProperties { get; set; }
    }
}
