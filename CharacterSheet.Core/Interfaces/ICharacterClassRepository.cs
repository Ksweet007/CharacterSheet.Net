using CharacterSheet.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharacterSheet.Core.Interfaces
{
    public interface ICharacterClassRepository
    {
        Class CreateClass(Class classToAdd);
        IList<Class> GetClassList();
    }
}
