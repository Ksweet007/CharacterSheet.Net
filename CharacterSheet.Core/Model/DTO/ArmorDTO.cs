using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharacterSheet.Core.Model.DTO
{
    public class ArmorDTO
    {
        public int ArmorId { get; set; }
        public string Name { get; set; }
        public int ArmorProficiencyId { get; set; }
        public string ProficiencyName { get; set; }
        public int ProficiencyTypeId { get; set; }
        public string Cost { get; set; }
        public string ArmorClass { get; set; }
        public string Strength { get; set; }
        public string Stealth { get; set; }
        public string Weight { get; set; }       
        
    }
}
