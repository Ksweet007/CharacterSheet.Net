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

        public DbSet<AbilityScore> AbilityScores { get; set; }
        public DbSet<Armor> Armors { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Proficiency> Proficiencies { get; set; }
        public DbSet<ProficiencyType> ProficiencyTypes { get; set; }
        public DbSet<Skill> Skills { get; set; }

        //Fluent API
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("ksweetadmin");
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            EfMapClass(modelBuilder);
            EfMapAbilityScores(modelBuilder);
            EfMapFeatures(modelBuilder);
            EfMapProficiency(modelBuilder);
            EfMapProficiencyTypes(modelBuilder);
            EfMapSkills(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }

        private static void EfMapAbilityScores(DbModelBuilder modelBuilder)
        {
            var abil = modelBuilder.Entity<AbilityScore>();
            abil.ToTable("AbilityScore");
            abil.HasMany(e => e.Skills)
                .WithRequired(e => e.AbilityScore)
                .WillCascadeOnDelete(false);
        }

        private static void EfMapClass(DbModelBuilder modelBuilder)
        {
            var cls = modelBuilder.Entity<Class>();
            cls.ToTable("classes").HasKey(k => k.classId);

            cls.HasMany(s => s.Skills)
                .WithMany(c => c.Classes)
                .Map(m => m.ToTable("ClassSkill").MapLeftKey("ClassId").MapRightKey("SkillId"));

            cls.HasMany(p => p.Proficiencies)
                .WithMany(c => c.Classes)
                .Map(m => m.ToTable("ClassProficiency").MapLeftKey("ClassId").MapRightKey("ProficiencyId"));

            cls.HasMany(e => e.Features)
                .WithMany(e => e.Classes)
                .Map(m => m.ToTable("ClassFeature").MapLeftKey("ClassId").MapRightKey("FeatureId"));

            cls.HasMany(e => e.ProficiencyTypes)
                .WithMany(e => e.Classes)
                .Map(m => m.ToTable("ClassProficiencyTypeAssoc").MapLeftKey("classId").MapRightKey("proficiencytypeId"));

        }

        private static void EfMapFeatures(DbModelBuilder modelBuilder)
        {
            var feature = modelBuilder.Entity<Feature>();
            feature.ToTable("features").HasKey(k => k.FeatureId);
        }

        private static void EfMapProficiency(DbModelBuilder modelBuilder)
        {
            var prof = modelBuilder.Entity<Proficiency>();
            prof.ToTable("Proficiencies").HasKey(k => k.ProficiencyId);

            prof.HasMany(e => e.Armors)
                .WithRequired(e => e.Proficiency)
                .HasForeignKey(e => e.ArmorProficiencyId)
                .WillCascadeOnDelete(false);
        }

        private static void EfMapProficiencyTypes(DbModelBuilder modelBuilder)
        {
            var profType = modelBuilder.Entity<ProficiencyType>();
            profType.ToTable("ProficiencyTypes").HasKey(p => p.ProficiencyTypeId);
            profType.Property(p => p.Name).HasColumnName("proficiencytype");

            profType.HasMany(e => e.Proficiencies)
                .WithRequired(e => e.ProficiencyType)
                .WillCascadeOnDelete(false);
        }

        private static void EfMapSkills(DbModelBuilder modelBuilder)
        {
            var skill = modelBuilder.Entity<Skill>();
            skill.ToTable("skills").HasKey(k => k.skillId);
        }
    }
}
