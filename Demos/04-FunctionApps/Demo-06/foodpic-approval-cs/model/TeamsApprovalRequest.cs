namespace Integrations
{
    public class TeamsApprovalRequest{
        public string OrchestrationInstanceID { get; set; }
        public string PicUrl { get; set; }
        public string ReturnUrl { get; set; }
        public bool Approved { get; set; }
    }
}