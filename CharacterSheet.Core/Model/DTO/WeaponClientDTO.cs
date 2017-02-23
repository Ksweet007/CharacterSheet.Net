using System.Collections.Generic;

namespace CharacterSheet.Core.Model.DTO
{
    public class WeaponClientDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public int ProficiencyId { get; set; }
        public Proficiency Proficiency { get; set; }
        public string ProficiencyName { get; set; }
        public string Cost { get; set; }
        public int DamageDie { get; set; }
        public int DamageDieCount { get; set; }
        public string Weight { get; set; }
        public IList<WeaponProperty> WeaponProperties { get; set; }
    }
}
