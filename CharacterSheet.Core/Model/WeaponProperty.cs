using System.Collections.Generic;

namespace CharacterSheet.Core.Model
{
    public class WeaponProperty
    {
        public WeaponProperty()
        {
            Weapons = new HashSet<Weapon>();
        }

        public int WeaponPropertyId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int WeaponsWeaponId { get; set; }

        public virtual ICollection<Weapon> Weapons { get; set; }
    }
}
