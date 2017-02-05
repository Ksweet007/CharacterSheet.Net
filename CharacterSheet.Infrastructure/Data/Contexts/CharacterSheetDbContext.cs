using System;
using System.Collections.Generic;
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
        public DbSet<ClassProficiencyTypeAssoc> Proficiencies  { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("ksweetadmin");
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            EfMapClass(modelBuilder);
            EfMapSkills(modelBuilder);
            EfMapProficiencies(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }
        //Fluent API
        private static void EfMapClass(DbModelBuilder modelBuilder)
        {
            var cls = modelBuilder.Entity<Class>();
            cls.ToTable("classes");
            cls.HasKey(k => k.classId);
        }

        private static void EfMapSkills(DbModelBuilder modelBuilder)
        {
            var skill = modelBuilder.Entity<Skill>();
            skill.ToTable("skills");
            skill.HasKey(k => k.skillId);
        }

        private static void EfMapProficiencies(DbModelBuilder modelBuilder)
        {
            var prof = modelBuilder.Entity<ClassProficiencyTypeAssoc>();
            prof.ToTable("ClassProficiencyTypeAssoc");
            prof.HasRequired(p => p.Class).WithMany().HasForeignKey(p => p.Class.classId);
            

            //prof.Property(k => k.CMIId)
            //    .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
        }
    }
}
