using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data.Contexts;

namespace CharacterSheet.Infrastructure.Data
{
    public class EquipmentRepository
    {
        private readonly CharacterSheetDbContext _db;

        public EquipmentRepository()
        {
            _db = new CharacterSheetDbContext();
        }

        public void AddArmor(Armor armorToAdd)
        {
            if (armorToAdd.Id == 0)
            {
                _db.Armors.Add(armorToAdd);
            }
            
            _db.SaveChanges();
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

        public ProficiencyType GetArmorProficiencyType(int proficiencyTypeId)
        {
            return  _db.ProficiencyTypes.Single(t => t.ProficiencyTypeId == proficiencyTypeId);
        }

        public void DeleteArmorById(int armorId)
        {
            var armorToDelete = _db.Armors.Single(a => a.Id == armorId);
            _db.Armors.Remove(armorToDelete);
            _db.SaveChanges();

        }

        public void Save()
        {
            _db.SaveChanges();
        }
        
    }
}
