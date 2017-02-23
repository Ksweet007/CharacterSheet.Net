using System.Collections.Generic;
using System.Linq;
using CharacterSheet.Core.Enums;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data.Contexts;

namespace CharacterSheet.Infrastructure.Data
{
    public class ProficiencyRepository
    {
        private readonly CharacterSheetDbContext _db;

        public ProficiencyRepository()
        {
            _db = new CharacterSheetDbContext();
        }

        public Proficiency GetProficiencyById(int proficiencyId)
        {
            return _db.Proficiencies.Single(p => p.Id == proficiencyId);
        }

        public IList<Proficiency> GetArmorProficiencies()
        {
            return _db.Proficiencies.Where(t => t.ProficiencyTypeId == ProficiencyTypeId.Armor).ToList();
        }

        public IList<Proficiency> GetAllProficiencies()
        {
            return _db.Proficiencies.ToList();
        }

    }
}
