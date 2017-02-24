using System.Web.Http;
using CharacterSheet.Core.Model;
using CharacterSheet.Infrastructure.Data;

namespace CharacterSheet.Controllers.Api
{
    public class WeaponController : BaseApiController
    {
        private readonly WeaponRepository _weaponRepository;
        private readonly ProficiencyRepository _proficiencyRepository;

        public WeaponController()
        {
            _weaponRepository = new WeaponRepository();
            _proficiencyRepository = new ProficiencyRepository();
        }


        [HttpGet]
        [Route("api/GetAllWeapons/")]
        public IHttpActionResult GetAllWeapons()
        {
            var weaponList = _weaponRepository.GetAllWeapons();

            return Ok(weaponList);
        }

        [HttpGet]
        [Route("api/GetWeaponProficiencyTypes/")]
        public IHttpActionResult GetWeaponProficiencyTypes()
        {
            var profList = _proficiencyRepository.GetWeaponProficiencies();
            
            return Ok(profList);
        }

        [HttpPut]
        [Route("api/EditWeapon/")]
        public IHttpActionResult EditWeapon([FromBody] Weapon weaponToEdit)
        {
            _weaponRepository.EditWeapon(weaponToEdit);

            return Ok(weaponToEdit);
        }

        [HttpDelete]
        [Route("api/DeleteWeapon/{weaponId}")]
        public IHttpActionResult DeleteArmorById(int weaponId)
        {
            _weaponRepository.DeleteWeaponById(weaponId);

            return Ok(weaponId);
        }


    }
}
