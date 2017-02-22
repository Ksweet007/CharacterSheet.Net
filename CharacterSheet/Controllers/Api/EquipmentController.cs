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

        public EquipmentController()
        {
            _equipmentRepository = new EquipmentRepository();
            _equipmentService = new EquipmentService();
        }

        [HttpGet]
        [Route("api/GetAllArmor/")]
        public IHttpActionResult GetAllFeatures()
        {
            var armorList = _equipmentService.GetArmorDTOList();

            return Ok(armorList);
        }

        [HttpPost]
        [Route("api/AddArmor/")]
        public IHttpActionResult AddNewFeature([FromBody] Armor armorToAdd)
        {
            _equipmentRepository.AddArmor(armorToAdd);

            return Ok(armorToAdd);
        }

    }
}
