using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using CharacterSheet.Core.Enums;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data.Contexts;

namespace CharacterSheet.Infrastructure.Data
{
    public class WeaponRepository
    {
        private readonly CharacterSheetDbContext _db;

        public WeaponRepository()
        {
            _db = new CharacterSheetDbContext();
        }

        public IList<Weapon> GetAllWeapons()
        {
            var weaponList = _db.Weapons.Include(p => p.Proficiency).ToList();
            
            return weaponList;
        }

        public IList<Proficiency> GetWeaponProficiencies()
        {
            return _db.Proficiencies.Where(t => t.ProficiencyTypeId == ProficiencyTypeId.Weapon).ToList();
        }
    }
}
