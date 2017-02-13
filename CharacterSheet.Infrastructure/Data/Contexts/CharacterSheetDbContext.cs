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

        //public DbSet<Class> Classes { get; set; }
        //public DbSet<Skill> Skills { get; set; }
        //public DbSet<Proficiency> Proficiencies { get; set; }
        //public DbSet<Feature> Features { get; set; }

        public DbSet<Class> Classes { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Proficiency> Proficiencies { get; set; }
        public DbSet<AbilityScore> AbilityScores { get; set; }
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
            EfMapAbilityScore(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }
        
        private static void EfMapClass(DbModelBuilder modelBuilder)
        {
            var cls = modelBuilder.Entity<Class>();
            cls.ToTable("classes");
            cls.HasKey(k => k.classId);

            cls.HasMany<Skill>(s => s.Skills)
                .WithMany(c => c.Classes)
                .Map(cs =>
                {
                    cs.MapLeftKey("ClassId");
                    cs.MapRightKey("SkillId");
                    cs.ToTable("ClassSkill");
                });

            cls.HasMany<Proficiency>(p => p.Proficiencies)
                .WithMany(c => c.Classes)
                .Map(cp =>
                {
                    cp.MapLeftKey("ClassId");
                    cp.MapRightKey("ProficiencyId");
                    cp.ToTable("ClassProficiency");
                });

        }

        private static void EfMapSkills(DbModelBuilder modelBuilder)
        {
            var skill = modelBuilder.Entity<Skill>();
            skill.ToTable("skills");
            skill.HasKey(k => k.skillId);

            //skill.HasRequired()
                
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

        private static void EfMapAbilityScore(DbModelBuilder modelBuilder)
        {
            var abil = modelBuilder.Entity<AbilityScore>();
            abil.ToTable("AbilityScores");
            abil.HasMany(e=>e.Skills)
                .WithRequired(e=>e.AbilityScore)
                .WillCascadeOnDelete(false);

            //abil.HasKey(k => k.AbilityScoreId);
        }


    }
}
