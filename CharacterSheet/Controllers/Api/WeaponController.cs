using System.Web.Http;
using CharacterSheet.Infrastructure.Data;

namespace CharacterSheet.Controllers.Api
{
    public class WeaponController : BaseApiController
    {
        private readonly WeaponRepository _weaponRepository;

        public WeaponController()
        {
            _weaponRepository = new WeaponRepository();
        }


        [HttpGet]
        [Route("api/GetAllWeapons/")]
        public IHttpActionResult GetAllWeapons()
        {
            var weapons = _weaponRepository.GetAllWeapons();

            return Ok(weapons);
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
