using System.Data.Entity;
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
        public DbSet<Feature> Features { get; set; }

        //Fluent API
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("ksweetadmin");
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            EfMapProficiency(modelBuilder);
            EfMapClass(modelBuilder);
            EfMapSkills(modelBuilder);
            EfMapFeature(modelBuilder);

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

        private static void EfMapFeature(DbModelBuilder modelBuilder)
        {
            var feature = modelBuilder.Entity<Feature>();
            feature.ToTable("features");
            feature.HasKey(k => k.FeatureId);
        }


    }
}
