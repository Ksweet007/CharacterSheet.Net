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
            return cls?.Skills.ToList() ?? new List<Skill>();
        }

        public IList<Proficiency> GetClassProficiencies(int classId)
        {
            var cls = _db.Classes.Include(x=>x.Proficiencies).SingleOrDefault(x => x.classId == classId);
            return cls?.Proficiencies.ToList() ?? new List<Proficiency>();
        }

        public IList<Class> GetClassList()
        {
           return  _db.Classes.ToList();
        }

        public Class GetClassById(int classId)
        {
            //var retObj = _db.Classes.FirstOrDefault(c => c.classId == classId);
            //var skills = _db.Entry(retObj).Collection(s => s.Skills);
            //var listop = skills.CurrentValue.ToList();
            //var retObj = _db.Classes.Include(x => x.Skills).Include(x=>x.Proficiencies).Single(n => n.classId == classId);
            var retObj = _db.Classes.Include(x => x.Skills).FirstOrDefault(s => s.classId == classId);
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

        public void AddProficiencyList(IList<Proficiency> profs)
        {
            _db.Proficiencies.AddRange(profs);
            _db.SaveChanges();
        }

        public void AddSkillList(IList<Skill> skills, int classId)
        {
            var cls = GetClassById(classId);
            foreach (var item in skills)
            {
                cls.Skills.Add(item);
            }
            
            _db.SaveChanges();
        }


    }
}
