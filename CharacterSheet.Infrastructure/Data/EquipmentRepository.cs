using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data.Contexts;

namespace CharacterSheet.Infrastructure.Data
{
    public class EquipmentRepository
    {
        private readonly EquipmentDbContext _edb;

        public EquipmentRepository()
        {
            _edb = new EquipmentDbContext();
        }

        public void AddArmor(Armor armorToAdd)
        {
            if (armorToAdd.Id == 0)
            {
                _edb.Armors.Add(armorToAdd);
            }
            
            _edb.SaveChanges();
        }

        public Armor GetArmorById(int armorId)
        {
            var armor = _edb.Armors.Single(a => a.Id == armorId);

            return armor;
        }

        public IList<Armor> GetAllArmors()
        {
            var armors = _edb.Armors.Include(p => p.Proficiency).ToList();
            
            return armors;
        }

        public void DeleteArmorById(int armorId)
        {
            var armorToDelete = _edb.Armors.Single(a => a.Id == armorId);
            _edb.Armors.Remove(armorToDelete);
            _edb.SaveChanges();

        }

        public void Save()
        {
            _edb.SaveChanges();
        }
        
    }
}
