using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data.Contexts;

namespace CharacterSheet.Infrastructure.Data
{
    public class FeatureRepository
    {
        private readonly CharacterSheetDbContext _db;

        public FeatureRepository()
        {
            _db = new CharacterSheetDbContext();
        }

        public IList<Feature> GetFeatureByClassId(int classId)
        {
            var features = _db.Features.Where(f => f.ClassId == classId);

            return features.ToList();
        }


    }
}
