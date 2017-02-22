using System.Collections.Generic;
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

        public IList<Armor> GetArmors()
        {
            var armors = _db.Armors.ToList();

            return armors;
        }

        public ProficiencyType GetArmorProficiencyType(int proficiencyTypeId)
        {
            return  _db.ProficiencyTypes.Single(t => t.ProficiencyTypeId == proficiencyTypeId);
        }
    }
}
