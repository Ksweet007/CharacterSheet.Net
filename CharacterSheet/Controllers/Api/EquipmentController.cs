using System.Web.Http;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data;
using CharacterSheet.Infrastructure.Data.Services;

namespace CharacterSheet.Controllers.Api
{
    public class EquipmentController : BaseApiController
    {
        private readonly EquipmentRepository _equipmentRepository;
        private readonly EquipmentService _equipmentService;
        private readonly ProficiencyRepository _profRepository;

        public EquipmentController()
        {
            _equipmentRepository = new EquipmentRepository();            
            _equipmentService = new EquipmentService();
            _profRepository = new ProficiencyRepository();
        }

        [HttpGet]
        [Route("api/GetAllArmor/")]
        public IHttpActionResult GetAllArmor()
        {
            var armorList = _equipmentService.GetAndMapArmorList();

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
            var returnArmor = _equipmentService.SaveArmorAndMapReturnDTO(armorToAdd);

            return Ok(returnArmor);
        }

        [HttpDelete]
        [Route("api/DeleteArmor/{armorId}")]
        public IHttpActionResult DeleteArmorById(int armorId)
        {
            _equipmentRepository.DeleteArmorById(armorId);

            return Ok(armorId);
        }

    }
}
