using System.ComponentModel.DataAnnotations;

namespace CharacterSheet.Models
{
    public class User
    {
        public int ContactId { get; set; }
        public string Name { get; set; }
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}