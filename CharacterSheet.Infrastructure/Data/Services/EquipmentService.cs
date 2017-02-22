using System;
using System.Collections.Generic;
using System.Linq;
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


        //public void AddNewArmor(ArmorDTO armorDto)
        //{
        //     var armorToSave = new Armor()
        //    {
        //        ArmorId = armorDto.ArmorId,
        //        ArmorProficiencyId = armorDto.ArmorProficiencyId,
        //        ArmorClass = armorDto.ArmorClass,
        //        Cost = armorDto.Cost,
        //        Name = armorDto.Name,
        //        Stealth = armorDto.Stealth,
        //        Strength = armorDto.Strength,
        //        Weight = armorDto.Weight

        //    };

        //    _equipmentRepository.AddArmor(armorToSave);
        //    armorDto.ArmorId = armorToSave.ArmorId;
        //}
    }
}
