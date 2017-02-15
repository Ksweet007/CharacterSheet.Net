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
            var retObj = _db.Classes.Include(x => x.Skills).FirstOrDefault(s => s.classId == classId);
            return retObj;
        }

        public IList<Skill> GetAllSkills()
        {
            return _db.Skills.Include(s => s.AbilityScore).ToList();
        }

        public IList<Proficiency> GetAllProfs()
        {
            return _db.Proficiencies.Include(p => p.ProficiencyType).ToList();
        }

        public IList<ProficiencyType> GetallProficiencyTypes()
        {
            return _db.ProficiencyTypes.ToList();
        }

        public void AddProficiency(Proficiency proficiencyToAdd)
        {
            if (proficiencyToAdd.ProficiencyId == 0)
            {
                _db.Proficiencies.Add(proficiencyToAdd);
            }
            
            _db.SaveChanges();
        }

        public void RemoveProficiency(int proficiencyId)
        {
            var profToDelete = _db.Proficiencies.Single(p => p.ProficiencyId == proficiencyId);

            _db.Proficiencies.Remove(profToDelete);
            _db.SaveChanges();
        }

        public void AddProficiencyList(IList<Proficiency> profs)
        {
            _db.Proficiencies.AddRange(profs);
            _db.SaveChanges();
        }

        public void AddSkillList(Skill skill, int classId)
        {           
            var cls = _db.Classes.Include(x => x.Skills).Single(c => c.classId == classId);
            var skillToAdd = GetAllSkills().Single(s => s.skillId == skill.skillId);

            cls?.Skills.Add(skillToAdd);
            
            _db.SaveChanges();
        }

    }
}
