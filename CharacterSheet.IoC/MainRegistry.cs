using CharacterSheet.Core.Interfaces;
using StructureMap.Configuration.DSL;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data;
using CharacterSheet.Infrastructure.Data.Contexts;
using StructureMap.Web;
using StructureMap;

namespace CharacterSheet.IoC
{
    public class MainRegistry : Registry
    {
        public MainRegistry()
        {
            Scan(scan =>
            {
                scan.WithDefaultConventions();
                scan.AssemblyContainingType<Class>(); //Core
                scan.AssemblyContainingType<CharacterClassRepository>(); // Infrastructure                
            });

            For<CharacterSheetDbContext>().HybridHttpOrThreadLocalScoped().Use<CharacterSheetDbContext>();

            For<ICharacterClassRepository>().Singleton().Use<CharacterClassRepository>();
        }
    }
}

