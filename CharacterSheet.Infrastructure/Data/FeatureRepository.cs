using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Metadata.Edm;
using System.Linq;
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

        public void AddFeature(Feature featureToAdd)
        {
            if (featureToAdd.FeatureId == 0)
            {
                _db.Features.Add(featureToAdd);
            }

            _db.SaveChanges();
        }

        public void AddFeatureToClass(Feature featureToAdd, int classId)
        {
            var cls = _db.Classes.Include(x => x.Features).Single(c => c.classId == classId);
            cls.Features.Add(featureToAdd);

            _db.SaveChanges();

        }

        public IList<Feature> GetAllFeatures()
        {

            return _db.Features.Include(c => c.Classes).ToList();
        }

        public IList<Feature> GetFeatureByClassId(int classId)
        {
            var cls = _db.Classes.Include(f => f.Features).Single(c => c.classId == classId);
            var features = cls?.Features.ToList() ?? new List<Feature>();

            return features;
        }
    }
}
