using CharacterSheet.Infrastructure;
using CharacterSheet.IoC;
using StructureMap;

namespace CharacterSheet.DependencyResolution {
	
    public static class IoC {
        public static IContainer Initialize()
        {
            var container = new Container(c =>
            {
                c.AddRegistry<DefaultRegistry>();
                c.AddRegistry<MainRegistry>();
                c.AddRegistry<InfrastructureRegistry>();
            });

            return container;

        }
    }
}