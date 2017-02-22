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
            if (armorToAdd.ArmorId == 0)
            {
                _db.Armors.Add(armorToAdd);
            }
            
            _db.SaveChanges();
        }

        public IList<Armor> GetArmorList()
        {
            var armorList = _db.Armors.ToList();

            foreach (var item in armorList)
            {
                var prof = _db.Proficiencies.Single(p => p.ProficiencyId == item.ArmorProficiencyId);
                prof.ProficiencyType = GetArmorProficiencyType(prof.ProficiencytypeId);

                item.Proficiency = prof;
            }

            return armorList;
        }

        public ProficiencyType GetArmorProficiencyType(int proficiencyTypeId)
        {
            return  _db.ProficiencyTypes.Single(t => t.ProficiencyTypeId == proficiencyTypeId);
        }
    }
}
