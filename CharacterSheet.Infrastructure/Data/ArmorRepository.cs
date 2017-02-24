using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data.Contexts;

namespace CharacterSheet.Infrastructure.Data
{
    public class ArmorRepository
    {
        private readonly EquipmentDbContext _db;

        public ArmorRepository()
        {
            _db = new EquipmentDbContext();
        }

        public void AddArmor(Armor armorToAdd)
        {
            if (armorToAdd.Id == 0)
            {
                _db.Armors.Add(armorToAdd);
            }

            Save();
        }

        public Armor GetArmorById(int armorId)
        {
            var armor = _db.Armors.Single(a => a.Id == armorId);

            return armor;
        }

        public IList<Armor> GetAllArmors()
        {
            var armors = _db.Armors.Include(p => p.Proficiency).ToList();

            return armors;
        }

        public void DeleteArmorById(int armorId)
        {
            var armorToDelete = _db.Armors.Single(a => a.Id == armorId);
            _db.Armors.Remove(armorToDelete);

            Save();

        }

        public void EditArmor(Armor armorToEdit)
        {
            var fromDb = GetArmorById(armorToEdit.Id);

            fromDb.ProficiencyId = armorToEdit.ProficiencyId;
            fromDb.Name = armorToEdit.Name;
            fromDb.Cost = armorToEdit.Cost;
            fromDb.ArmorClass = armorToEdit.ArmorClass;
            fromDb.Strength = armorToEdit.Strength;
            fromDb.Stealth = armorToEdit.Stealth;
            fromDb.Weight = armorToEdit.Weight;

            Save();
        }

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
