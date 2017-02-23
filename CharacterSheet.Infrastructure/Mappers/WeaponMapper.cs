using System.Collections.Generic;
using System.Linq;
using CharacterSheet.Core.Model;
using CharacterSheet.Core.Model.DTO;

namespace CharacterSheet.Infrastructure.Mappers
{
    public static class WeaponMapper
    {
        public static IList<WeaponClientDTO> MapDatabaseListToClientDTO(IList<Weapon> weaponListToMap )
        {
            return weaponListToMap.Select(w => new WeaponClientDTO
            {
                Id = w.Id,
                Name = w.Name,
                Proficiency = w.Proficiency,
                //ProficiencyId = w.Proficiency.Id,
                Cost = w.Cost,
                DamageDie = w.DamageDie,
                DamageDieCount = w.DamageDieCount,
                Weight = w.Weight,
                WeaponProperties = w.WeaponProperties.ToList()

            }).ToList();
        }
    }
}
