using StructureMap;
using CharacterSheet.Core.Interfaces;
using CharacterSheet.Infrastructure.Data;

namespace CharacterSheet.Infrastructure
{
    public class InfrastructureRegistry : Registry
    {
        public InfrastructureRegistry()
        {
            Scan(
               scan =>
               {
                   scan.TheCallingAssembly();
                   scan.WithDefaultConventions();
               });

            For<ICharacterClassRepository>().Use<CharacterClassRepository>();

        }
    }
}

