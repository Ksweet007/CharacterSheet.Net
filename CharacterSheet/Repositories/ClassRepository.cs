using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CharacterSheet.Repositories.Contexts;
using CharacterSheet.Models;

namespace CharacterSheet.Repositories
{
    
    public class ClassRepository
    {
        private readonly CharacterSheetDbContext _db;

        public ClassRepository()
        {
            _db = new CharacterSheetDbContext();
        }

        public Class CreateClass(Class classToAdd)
        {
            _db.Classes.Add(classToAdd);
            _db.SaveChanges();

            return classToAdd;
        }

    }
}