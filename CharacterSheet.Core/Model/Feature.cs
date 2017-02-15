using System.Collections.Generic;

namespace CharacterSheet.Core.Model
{
    public class Feature
    {
        public Feature()
        {
            Classes = new HashSet<Class>();
        }

        public int FeatureId { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public string ActionType { get; set; }
        public string RecoveryType { get; set; }
        public int Levelgained { get; set; }        
        public virtual ICollection<Class> Classes { get; set; }
    }
}
