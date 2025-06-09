namespace tnki_line_sale_frontend.Models
{
    public class RecDataDetail
    {
        public DateTime reqDate { get; set; }
        public Guid reqGuid { get; set; }
        public string reqDate_str { get; set; }
        public string recNo { get; set; }
        public string custLineDisplayName { get; set; }
        public string custName { get; set; }
        public string custTel { get; set; }
        public string status { get; set; }
        public string statusDisp { get; set; }
        public string statusCss { get; set; }
        public string rejectRemark { get; set; }
        public string rejectRemarkOther { get; set; }
        public string storeName { get; set; }
        public Guid storeGuid { get; set; }
        public List<RecImage> lstRecImg { get; set; }
        public RecImage recImg { get; set; }
    }
}
