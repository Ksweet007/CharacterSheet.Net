using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.ModelConfiguration.Conventions;
using CharacterSheet.Core.Model;

namespace CharacterSheet.Infrastructure.Data.Contexts
{
    public class CharacterSheetDbContext : DbContext
    {
        public CharacterSheetDbContext()
            : base("SweetCharacterSheets")
        {
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Class> Classes { get; set; }
        public DbSet<Skill> Skills { get; set; }
        //public DbSet<ClassProficiencyTypeAssoc> ClassProficiencyTypeAssocs { get; set; }
        public DbSet<Proficiencies> Proficiencies { get; set; }
        //public DbSet<ClassSkillAssoc> ClassSkills { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("ksweetadmin");
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            EfMapClass(modelBuilder);
            EfMapSkills(modelBuilder);
            //EfMapClassSkills(modelBuilder);
            EfMapProficiencies(modelBuilder);
            //EfMapProficiencyAssocs(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }
        //Fluent API
        private static void EfMapClass(DbModelBuilder modelBuilder)
        {
            var cls = modelBuilder.Entity<Class>();
            cls.ToTable("classes");
            cls.HasKey(k => k.classId);
            cls.HasMany(u => u.Skills)
                .WithMany()
                .Map(m =>
                {
                    m.MapLeftKey("ClassId");
                    m.MapRightKey("SkillId");
                    m.ToTable("ClassSkillAssoc");
                });

            //cls.HasMany(c => c.ClassSkills).WithRequired(cr => cr.Class);

            //cls.HasMany(t => t.Proficiencies).WithMany()
            //    .Map(t => t.ToTable("ClassProficiencyTypeAssoc")
            //        .MapLeftKey("classId")
            //        .MapRightKey("proficiencytypeId"));

        }

        //private static void EfMapClassSkills(DbModelBuilder modelBuilder)
        //{
        //    //var clsSkill = modelBuilder.Entity<ClassSkillAssoc>();
        //    //clsSkill.ToTable("ClassSkillAssoc");
        //    //clsSkill.HasKey(t => t.Id);
        //    //clsSkill.HasMany(u => u.c)

        //    //modelBuilder.Entity<ClassSkillAssoc>().HasMany(t => t.Classes).WithMany()
        //    //    .Map(t => t.ToTable("ClassSkillAssoc")
        //    //        .MapLeftKey("ClassId")
        //    //        .MapRightKey("ClassId"));

        //    //modelBuilder.Entity<ClassSkillAssoc>().HasMany(t => t.Skills).WithMany()
        //    //    .Map(t => t.ToTable("ClassSkillAssoc")
        //    //        .MapLeftKey("SkillId")
        //    //        .MapRightKey("SkillId"));

        //}

        private static void EfMapSkills(DbModelBuilder modelBuilder)
        {
            var skill = modelBuilder.Entity<Skill>();
            skill.ToTable("skills");
            skill.HasKey(k => k.skillId);
        }

        private static void EfMapProficiencies(DbModelBuilder modelBuilder)
        {
            var prof = modelBuilder.Entity<Proficiencies>();
            prof.ToTable("ProficiencyTypes")
                .HasKey(k => k.ProficiencytypeId);
        }

        //private static void EfMapProficiencyAssocs(DbModelBuilder modelBuilder)
        //{
        //    var prof = modelBuilder.Entity<ClassProficiencyTypeAssoc>();
        //    prof.ToTable("ClassProficiencyTypeAssoc");

        //}
    }
}
