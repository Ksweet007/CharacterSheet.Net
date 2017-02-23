using System.Collections.Generic;

namespace CharacterSheet.Core.Model
{
    public class Class
    {
        public Class()
        {
            Features = new HashSet<Feature>();
            Skills = new HashSet<Skill>();
            //Proficienciessss = new HashSet<Proficiency>();
            ProficiencyTypes = new HashSet<ProficiencyType>();
        }
        public int classId { get; set; }
        public string Name { get; set; }
        public string description { get; set; }
        public string primaryability { get; set; }
        public string hitdieperlevel { get; set; }
        public string hpatfirstlevel { get; set; }
        public string hpathigherlevels { get; set; }
        public ICollection<Feature> Features { get; set; }
        public virtual ICollection<Skill> Skills { get; set; }
        //public ICollection<Proficiency> Proficienciessss { get; set; }
        public virtual ICollection<ProficiencyType> ProficiencyTypes { get; set; }
    }
}
