using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CharacterSheet.Core.Model;
using CharacterSheet.Core.Model.DTO;

namespace CharacterSheet.Infrastructure.Data.Services
{
    public class EquipmentService
    {
        private readonly EquipmentRepository _equipmentRepository;

        public EquipmentService()
        {
            _equipmentRepository = new EquipmentRepository();
        }

        public IList<ArmorDTO> GetArmorDTOList()
        {
            var armorList = _equipmentRepository.GetArmorList() ?? new List<Armor>();

            return armorList.Select(item => new ArmorDTO
            {
                ArmorId = item.ArmorId,
                ArmorProficiencyId = item.ArmorProficiencyId,
                ArmorClass = item.ArmorClass,
                Cost = item.Cost,
                Name = item.Name,
                ProficiencyName = item.Proficiency.Name,
                ProficiencyTypeId = item.Proficiency.ProficiencytypeId,
                Stealth = item.Stealth,
                Strength = item.Strength,
                Weight = item.Weight

            }).ToList();
        }
    }
}
