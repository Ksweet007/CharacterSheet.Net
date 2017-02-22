using System.Linq;
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


    }
}
