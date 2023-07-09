namespace Integrations
{
    public class FoodModel {
        public int ID { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string PictureUrl { get; set; }
        public bool Enabled {get;set;}
        public string OrchestrationInstanceId {get;set;}
    }

    public class FoodRemoveModel{
        public int ID { get; set; }
        public string OrchestrationInstanceId {get;set;}
    }

    public class FoodCompleteModel {
        public string OrchestrationInstanceId {get;set;}
    }
}