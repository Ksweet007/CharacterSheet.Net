using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using CharacterSheet.Core.Interfaces;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data.Contexts;


namespace CharacterSheet.Infrastructure.Data
{
    public class CharacterClassRepository
    {
        private readonly CharacterSheetDbContext _db;

        public CharacterClassRepository()
        {
            _db = new CharacterSheetDbContext();
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

        public Class GetClassById(int classId)
        {
            return _db.Classes.Single(c => c.classId == classId);
        }

        public IList<Skill> GetAllSkills()
        {
            return _db.Skills.ToList();
        }

        public IList<ClassProficiencyTypeAssoc> GetAllProfs()
        {
            return _db.Proficiencies.ToList();
        }

    }
}
