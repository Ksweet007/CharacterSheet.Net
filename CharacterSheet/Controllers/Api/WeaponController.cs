using System.Web.Http;
using CharacterSheet.Infrastructure.Data;
using CharacterSheet.Infrastructure.Data.Services;
using CharacterSheet.Infrastructure.Mappers;

namespace CharacterSheet.Controllers.Api
{
    public class WeaponController : BaseApiController
    {
        private readonly WeaponRepository _weaponRepository;
        private readonly EquipmentService _equipmentService;

        public WeaponController()
        {
            _weaponRepository = new WeaponRepository();
            _equipmentService = new EquipmentService();
        }


        [HttpGet]
        [Route("api/GetAllWeapons/")]
        public IHttpActionResult GetAllWeapons()
        {
            //var weaponList = _equipmentService.GetWeaponListDTOForClient();

            var weaponList = _weaponRepository.GetAllWeapons();

            return Ok(weaponList);
        }

        [HttpGet]
        [Route("api/GetWeaponProficiencyTypes/")]
        public IHttpActionResult GetWeaponProficiencyTypes()
        {
            var profList = _weaponRepository.GetWeaponProficiencies();
            
            return Ok(profList);
        }


    }
}
