using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using CharacterSheet.Core.Interfaces;
using CharacterSheet.Core.Model;
using CharacterSheet.Core.Model.DTO;
using CharacterSheet.Infrastructure.Data;


namespace CharacterSheet.Controllers.Api
{
    public class ClassController : ApiController
    {

        private readonly CharacterClassRepository _characterClassRepository;
        private readonly FeatureRepository _featureRepository;
        public ClassController()
        {
            _characterClassRepository = new CharacterClassRepository();
            _featureRepository = new FeatureRepository();
        }

        [HttpGet]
        [Route("api/GetClassList")]
        public IHttpActionResult GetClassList()
        {
            return Ok(_characterClassRepository.GetClassList());
        }

        [HttpGet]
        [Route("api/GetClassFeatures/{classId}")]
        public IHttpActionResult GetClassFeatures(int classId)
        {
            var featureList = _featureRepository.GetFeatureByClassId(classId);

            return Ok(featureList);
        }


        [HttpGet]
        [Route("api/GetClass/{classId}")]
        public IHttpActionResult GetClass(int classId)
        {
            return Ok(_characterClassRepository.GetClassById(classId));
        }

        [HttpGet]
        [Route("api/GetSheetFields/{classId}")]
        public IHttpActionResult GetSheetFields(int classId)
        {
            var cls = _characterClassRepository.GetClassById(classId);
            var allSkills = _characterClassRepository.GetAllSkills();
            var proficiencyList = _characterClassRepository.GetAllProfs();

            var mappedClass = new NewClassDTO
            {
                classId = cls.classId,
                name = cls.name,
                description = cls.description,
                primaryability = cls.primaryability,
                hitdieperlevel = cls.hitdieperlevel,
                hpatfirstlevel = cls.hpatfirstlevel,
                hpathigherlevels = cls.hpathigherlevels,
                skills = allSkills,
                ClassSkills = cls.Skills,
                Proficiencies = proficiencyList
            };

            return Ok(mappedClass);
        }

        [HttpPost]
        [Route("api/EditClass")]
        public IHttpActionResult EditClass([FromBody]string value)
        {
            return Ok();
        }

        [HttpPut]
        [Route("api/AddClass")]
        public IHttpActionResult AddNewClass(Class classToAdd)
        {
            var addedClass = _characterClassRepository.CreateClass(classToAdd);

            return Ok(addedClass);
        }

        [HttpPut]
        [Route("api/AddClassList")]
        public IHttpActionResult AddNewClassList(IList<Class> classesToAdd)
        {
            foreach (var item in classesToAdd)
            {
                _characterClassRepository.CreateClass(item);
            }

            return Ok(classesToAdd);
        }

        [HttpPut]
        [Route("api/AddProficiencies")]
        public IHttpActionResult AddNewProficiency(IList<Proficiency> profsToAdd )
        {
            foreach (var item in profsToAdd)
            {
                 _characterClassRepository.AddProficiency(item);   
            }

            return Ok(profsToAdd);
        }

        [HttpDelete]
        [Route("api/DeleteClass")]
        public IHttpActionResult Delete(int id)
        {
            return Ok();
        }
    }
}