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

        public IList<Feature> GetFeatureByClassId(int classId)
        {
            var cls = _db.Classes.Include(f => f.Features).Single(c => c.classId == classId);
            var features = cls?.Features.ToList() ?? new List<Feature>();

            return features;
        }

        public IList<Feature> GetAllFeatures()
        {

            return _db.Features.Include(c => c.Classes).ToList();
        }

        public void AddProficiencies(IList<Feature> features)
        {
            _db.Features.AddRange(features);
            _db.SaveChanges();
        }

        public void AddProficiency(Feature feature)
        {
            if (feature.FeatureId == 0)
            {
                _db.Features.Add(feature);
            }

            _db.SaveChanges();
        }


    }
}
