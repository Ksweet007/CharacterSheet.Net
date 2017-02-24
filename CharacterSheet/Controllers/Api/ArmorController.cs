using System.Web.Http;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data;

namespace CharacterSheet.Controllers.Api
{
    public class ArmorController : BaseApiController
    {
        private readonly ProficiencyRepository _profRepository;
        private readonly ArmorRepository _armorRepository;

        public ArmorController()
        {
            _profRepository = new ProficiencyRepository();
            _armorRepository = new ArmorRepository();
        }



        [HttpGet]
        [Route("api/GetAllArmor/")]
        public IHttpActionResult GetAllArmor()
        {
            var armorList = _armorRepository.GetAllArmors();

            return Ok(armorList);
        }

        [HttpGet]
        [Route("api/GetArmorProficiencyTypes/")]
        public IHttpActionResult GetArmorProficiencyTypes()
        {
            var profList = _profRepository.GetArmorProficiencies();

            return Ok(profList);
        }

        [HttpPost]
        [Route("api/AddArmor/")]
        public IHttpActionResult AddArmor([FromBody] Armor armorToAdd)
        {
            _armorRepository.AddArmor(armorToAdd);

            return Ok(armorToAdd);
        }

        [HttpPut]
        [Route("api/EditArmor/")]
        public IHttpActionResult EditArmor([FromBody] Armor armorToEdit)
        {
            _armorRepository.EditArmor(armorToEdit);

            return Ok(armorToEdit);
        }

        [HttpDelete]
        [Route("api/DeleteArmor/{armorId}")]
        public IHttpActionResult DeleteArmorById(int armorId)
        {
            _armorRepository.DeleteArmorById(armorId);

            return Ok(armorId);
        }
    }
}
