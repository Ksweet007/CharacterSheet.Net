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

        //[HttpPut]
        //[Route("api/AddFeature/")]
        //public IHttpActionResult AddNewFeature(Feature featureToAdd)
        //{
        //    _featureRepository.AddFeature(featureToAdd);

        //    return Ok(featureToAdd);
        //}

        [HttpPost]
        [Route("api/AddFeature/")]
        public IHttpActionResult AddNewFeature([FromBody] Feature featureToAdd)
        {
            _featureRepository.AddFeature(featureToAdd);

            return Ok(featureToAdd);
        }

        [HttpPut]
        [Route("api/EditFeature")]
        public IHttpActionResult EditFeature(Feature featureToEdit)
        {
            _featureRepository.EditFeature(featureToEdit);

            return Ok(featureToEdit);
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

        [HttpDelete]
        [Route("api/RemoveFeature/{featureId}")]
        public IHttpActionResult RemoveProficiency(int featureId)
        {
            _featureRepository.RemoveFeature(featureId);

            return Ok();
        }

    }
}
