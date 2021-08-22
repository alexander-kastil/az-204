namespace Integrations
{
    public class ApprovalRequest{
        public string Url { get; set; }
        public string ReturnUrl { get; set; }
        public bool? Approved { get; set; }
    }
}