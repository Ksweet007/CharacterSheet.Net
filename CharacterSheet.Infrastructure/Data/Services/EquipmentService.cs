using System.Collections.Generic;
using System.Linq;
using CharacterSheet.Core.Model.DTO;

namespace CharacterSheet.Infrastructure.Data.Services
{
    public class EquipmentService
    {
        private readonly EquipmentRepository _equipmentRepository;
        private readonly ProficiencyRepository _proficiencyRepository;

        public EquipmentService()
        {
            _equipmentRepository = new EquipmentRepository();
            _proficiencyRepository = new ProficiencyRepository();
        }

        public IList<ArmorDTO> GetAndMapArmorList()
        {
            var armorList = _equipmentRepository.GetArmors();

            return armorList.Select(item => new ArmorDTO
            {
                Id = item.Id,
                ProficiencyId = item.ProficiencyId,
                Name = item.Name,
                ArmorClass = item.ArmorClass,
                Cost = item.Cost,
                Stealth = item.Stealth,
                Strength = item.Strength,
                Weight = item.Weight,
                ProficiencyName = _proficiencyRepository.GetProficiencyById(item.ProficiencyId).Name
            }).ToList();
        }

    }
}
