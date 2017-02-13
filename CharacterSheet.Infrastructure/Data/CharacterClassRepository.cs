using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using CharacterSheet.Core.Interfaces;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data.Contexts;

//https://msdn.microsoft.com/en-us/data/jj591620.aspx
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
            var tstcls = _db.Classes.Include(s=>s.Skills).Single(c => c.classId == classId);
            var tstskl = tstcls?.Skills.ToList() ?? new List<Skill>();
            
            return tstskl;

            //var cls = _db.Classes.Include(x => x.Skills).FirstOrDefault(s => s.classId == classId);
            //var skills = _db.Entry(cls).Collection(s => s.Skills);
            //return skills?.CurrentValue.ToList() ?? new List<Skill>();
            //var listop = skills.CurrentValue.ToList();
            //var retObj = _db.Classes.Include(x => x.Skills).Include(x=>x.Proficiencies).Single(n => n.classId == classId);

            //var cls = _db.Classes.Include(x=>x.Skills).SingleOrDefault(x => x.classId == classId);
            //return cls?.Skills.ToList() ?? new List<Skill>();
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

        public void AddSkillList(Skill skill, int classId)
        {
            var cls = _db.Classes.FirstOrDefault(c => c.classId == classId);
            cls?.Skills.Add(skill);
            if (_db.Entry(skill).State == EntityState.Detached)
            {
                _db.Skills.Attach(skill);
            }
            
            _db.SaveChanges();
        }


    }
}
