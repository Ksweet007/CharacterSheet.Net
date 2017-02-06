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
        public DbSet<Proficiency> Proficiencies { get; set; }
        
        //Fluent API
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("ksweetadmin");
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            EfMapProficiency(modelBuilder);
            EfMapClass(modelBuilder);
            EfMapSkills(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }
        
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
            cls.HasMany(u => u.Proficiencies)
                .WithMany()
                .Map(m =>
                {
                    m.MapLeftKey("ClassId");
                    m.MapRightKey("ProficiencyId");
                    m.ToTable("ClassProficiencyAssoc");
                });
        }

        private static void EfMapSkills(DbModelBuilder modelBuilder)
        {
            var skill = modelBuilder.Entity<Skill>();
            skill.ToTable("skills");
            skill.HasKey(k => k.skillId);
        }

        private static void EfMapProficiency(DbModelBuilder modelBuilder)
        {
            var prof = modelBuilder.Entity<Proficiency>();
            prof.ToTable("Proficiencies");
            prof.HasKey(k => k.ProficiencyId);
        }


    }
}
