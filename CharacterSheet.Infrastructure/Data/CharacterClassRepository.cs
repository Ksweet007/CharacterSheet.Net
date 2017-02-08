using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
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

        public IList<Skill> GetClassSkills(int classId)
        {
            var cls = _db.Classes.Include(x=>x.Skills).SingleOrDefault(x => x.classId == classId);
            return cls != null ? cls.Skills : new List<Skill>();
        }

        public IList<Proficiency> GetClassProficiencies(int classId)
        {
            var cls = _db.Classes.Include(x=>x.Proficiencies).SingleOrDefault(x => x.classId == classId);
            return cls != null ? cls.Proficiencies : new List<Proficiency>();
        }

        public IList<Class> GetClassList()
        {
           return  _db.Classes.ToList();
        }

        public Class GetClassById(int classId)
        {
            var retObj = _db.Classes.Include(x => x.Skills).Include(x=>x.Proficiencies)
                .Single(n => n.classId == classId);
            return retObj;
        }

        public IList<Skill> GetAllSkills()
        {
            return _db.Skills.ToList();
        }

        public IList<Proficiency> GetAllProfs()
        {
            return _db.Proficiencies.ToList();
        }

        public void AddProficiencies(IList<Proficiency> profs)
        {
            _db.Proficiencies.AddRange(profs);
            _db.SaveChanges();
        }

        public void AddProficiency(Proficiency prof)
        {
            if (prof.ProficiencyId == 0)
            {
                _db.Proficiencies.Add(prof);
            }
            
            _db.SaveChanges();
        }


    }
}
