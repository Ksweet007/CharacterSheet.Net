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
        
        private readonly EquipmentDbContext _db;

        public WeaponRepository()
        {
            _db = new EquipmentDbContext();
        }

        public Weapon GetWeaponById(int weaponId)
        {
            return _db.Weapons.Single(w => w.Id == weaponId);
        }

        public IList<Weapon> GetAllWeapons()
        {
            return _db.Weapons.Include(p => p.Proficiency).ToList();
        }

        public void AddWeapon(Weapon weaponToAdd)
        {
            if (weaponToAdd.Id != 0) return;                

            _db.Weapons.Add(weaponToAdd);
            Save();
        }

        public void EditWeapon(Weapon weaponToEdit)
        {
            var fromDb = _db.Weapons.Include(p=>p.WeaponProperties).Single(w => w.Id == weaponToEdit.Id);
            
            fromDb.ProficiencyId = weaponToEdit.ProficiencyId;
            fromDb.Name = weaponToEdit.Name;
            fromDb.Cost = weaponToEdit.Cost;
            fromDb.DamageDieCount = weaponToEdit.DamageDieCount;
            fromDb.DamageDie = weaponToEdit.DamageDie;
            fromDb.WeaponProperties = weaponToEdit.WeaponProperties;
                       
            Save();         
        }

        public void DeleteWeaponById(int weaponId)
        {
            var weaponToDelete = _db.Weapons.Single(w => w.Id == weaponId);
            _db.Weapons.Remove(weaponToDelete);

            Save();
        }

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
