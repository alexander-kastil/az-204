namespace Integrations
{
    public class TeamsApprovalRequest{
        public string OrchestrationInstanceID { get; set; }
        public string PicUrl { get; set; }
        public string ReturnUrl { get; set; }
        public bool Approved { get; set; }
    }

    public class TeamsApprovalResponse{
        public string OrchestrationInstanceID { get; set; }
        public bool Approved { get; set; }
    }

    public class FoodPicApprovalCompleteData {
        public string OrchestrationInstanceId {get;set;}
    }
}