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
        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("ksweetadmin");
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            EfMapArmor(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }

        private static void EfMapArmor(DbModelBuilder modelBuilder)
        {
            var armor = modelBuilder.Entity<Armor>();
            armor.HasRequired(p => p.Proficiency)
                .WithMany(p => p.Armors);        
        }
    }
}
