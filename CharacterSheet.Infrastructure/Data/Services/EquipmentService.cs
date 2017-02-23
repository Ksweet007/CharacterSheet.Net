using System.Collections.Generic;
using System.Linq;
using CharacterSheet.Core.Model;
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

        public ArmorDTO SaveArmorAndMapReturnDTO(Armor armorToAdd)
        {
            _equipmentRepository.AddArmor(armorToAdd);

            return new ArmorDTO
            {
                Id = armorToAdd.Id,
                ProficiencyId = armorToAdd.ProficiencyId,
                Name = armorToAdd.Name,
                ArmorClass = armorToAdd.ArmorClass,
                Cost = armorToAdd.Cost,
                Stealth = armorToAdd.Stealth,
                Strength = armorToAdd.Strength,
                Weight = armorToAdd.Weight,
                ProficiencyName = _proficiencyRepository.GetProficiencyById(armorToAdd.ProficiencyId).Name
            };
        }

        public void EditArmor(Armor armorToEdit)
        {
            var fromDb = _equipmentRepository.GetArmorById(armorToEdit.Id);
            fromDb.ProficiencyId = armorToEdit.ProficiencyId;
            fromDb.Name = armorToEdit.Name;
            fromDb.Cost = armorToEdit.Cost;
            fromDb.ArmorClass = armorToEdit.ArmorClass;
            fromDb.Strength = armorToEdit.Strength;
            fromDb.Stealth = armorToEdit.Stealth;
            fromDb.Weight = armorToEdit.Weight;
            
            _equipmentRepository.Save();

        }

    }
}
