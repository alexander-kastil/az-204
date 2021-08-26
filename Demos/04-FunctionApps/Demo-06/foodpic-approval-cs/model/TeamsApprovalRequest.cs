namespace Integrations
{
    public class TeamsApprovalRequest{
        public string OrchestrationInstanceID { get; set; }
        public string ReturnUrl { get; set; }
        public ApprovalRequest InitialRequest {get;set;}
        public bool Approved { get; set; }
    }
}