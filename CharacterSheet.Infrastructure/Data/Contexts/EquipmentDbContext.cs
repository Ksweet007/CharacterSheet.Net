using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using CharacterSheet.Core.Model;

namespace CharacterSheet.Infrastructure.Data.Contexts
{
    public class EquipmentDbContext : DbContext
    {
        public EquipmentDbContext()
            : base("SweetCharacterSheets")
        {
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Armor> Armors { get; set; }
        public DbSet<Weapon> Weapons { get; set; }
        public DbSet<WeaponProperty> WeaponProperties { get; set; }        

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("association");
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            EfMapArmor(modelBuilder);
            EfMapWeapons(modelBuilder);
            EfMapWeaponProperties(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }

        private static void EfMapArmor(DbModelBuilder modelBuilder)
        {
            var armor = modelBuilder.Entity<Armor>();
            armor.ToTable("Armor", "ksweetadmin");
            armor.HasRequired(p => p.Proficiency)
                .WithMany(p => p.Armors)
                .WillCascadeOnDelete(false);       
        }

        private static void EfMapWeapons(DbModelBuilder modelBuilder)
        {
            var weap = modelBuilder.Entity<Weapon>();
            weap.ToTable("Weapon", "ksweetadmin");
            weap.Ignore(x => x.ProficiencyName);

            weap.HasRequired(p => p.Proficiency)
                .WithMany(p => p.Weapons)
                .WillCascadeOnDelete(false);

            weap.HasMany(s => s.WeaponProperties)
                .WithMany(c => c.Weapons)
                .Map(m => m.ToTable("WeaponWeaponProperty", "assocs"));                            
            
        }

        private static void EfMapWeaponProperties(DbModelBuilder modelBuilder)
        {
            var prop = modelBuilder.Entity<WeaponProperty>();
            prop.ToTable("WeaponProperty", "ksweetadmin");
        }
        
    }
}
