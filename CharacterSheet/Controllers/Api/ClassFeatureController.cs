using System.Collections.Generic;
using System.Web.Http;
using CharacterSheet.Controllers.Api;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data;

namespace CharacterSheet.Controllers
{
    
    public class ClassFeatureController : BaseApiController
    {
        private readonly CharacterClassRepository _characterClassRepository;
        private readonly FeatureRepository _featureRepository;
        public ClassFeatureController()
        {
            _characterClassRepository = new CharacterClassRepository();
            _featureRepository = new FeatureRepository();
        }

        [HttpPut]
        [Route("api/AddFeature/")]
        public IHttpActionResult AddNewFeature(Feature featureToAdd)
        {
            foreach (var item in featureToAdd.Classes)
            {
                _featureRepository.AddFeatureToClass(featureToAdd,item.classId);
            }

            return Ok(featureToAdd);
        }

        [HttpGet]
        [Route("api/GetAllFeatures/")]
        public IHttpActionResult GetAllFeatures()
        {
            var featureList = _featureRepository.GetAllFeatures();

            return Ok(featureList);
        }

        [HttpGet]
        [Route("api/GetClassFeatures/{classId}")]
        public IHttpActionResult GetClassFeatures(int classId)
        {
            var featureList = _featureRepository.GetFeatureByClassId(classId);

            return Ok(featureList);
        }
        
    }
}
