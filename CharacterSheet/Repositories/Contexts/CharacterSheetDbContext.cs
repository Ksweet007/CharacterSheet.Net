using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using CharacterSheet.Core.Model;


namespace CharacterSheet.Repositories.Contexts
{
    public class CharacterSheetDbContext : DbContext
    {
        public CharacterSheetDbContext() 
            : base("SweetCharacterSheets")
        {
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Class> Classes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("ksweetadmin");
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            EfMapClass(modelBuilder);


            base.OnModelCreating(modelBuilder);
        }

        private static void EfMapClass(DbModelBuilder modelBuilder)
        {
            var cmi = modelBuilder.Entity<Class>();
            cmi.ToTable("classes");
            cmi.HasKey(k => k.classId);
        }



    }
}