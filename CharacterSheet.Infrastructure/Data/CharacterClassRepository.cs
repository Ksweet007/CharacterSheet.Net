using System.Collections;
using System.Collections.Generic;
using System.Linq;
using CharacterSheet.Core.Interfaces;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data.Contexts;


namespace CharacterSheet.Infrastructure.Data
{
    public class CharacterClassRepository : ICharacterClassRepository
    {
        private readonly CharacterSheetDbContext _db;

        public CharacterClassRepository(CharacterSheetDbContext db)
        {
            _db = db;
        }

        public Class CreateClass(Class classToAdd)
        {
            _db.Classes.Add(classToAdd);
            _db.SaveChanges();

            return classToAdd;
        }

        public IList<Class> GetClassList()
        {
           return  _db.Classes.ToList();
        }
    }
}
