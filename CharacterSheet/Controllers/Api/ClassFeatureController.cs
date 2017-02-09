using System.Collections.Generic;
using System.Web.Http;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data;

namespace CharacterSheet.Controllers
{
    public class ClassFeatureController : ApiController
    {
        private readonly CharacterClassRepository _characterClassRepository;
        private readonly FeatureRepository _featureRepository;
        public ClassFeatureController()
        {
            _characterClassRepository = new CharacterClassRepository();
            _featureRepository = new FeatureRepository();
        }

        [HttpGet]
        [Route("api/GetClassFeatures/{classId}")]
        public IHttpActionResult GetClassFeatures(int classId)
        {
            var featureList = _featureRepository.GetFeatureByClassId(classId);

            return Ok(featureList);
        }

        [HttpPut]
        [Route("api/AddFeatureList/")]
        public IHttpActionResult AddNewFeatureList(IList<Feature> featuresToAdd)
        {
            foreach (var item in featuresToAdd)
            {
                _featureRepository.AddProficiency(item);
            }

            return Ok(featuresToAdd);
        }



    }
}
