namespace CharacterSheet.Core.Model
{
    public class Feature
    {
        public int FeatureId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ActionType { get; set; }
        public string RecoveryType { get; set; }
        public int Levelgained { get; set; }
        public int ClassId { get; set; }
    }
}
