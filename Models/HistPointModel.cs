namespace tnki_line_sale_frontend.Models
{
    public class HistPointModel
    {
        public string requestDate_str { get; set; }
        public DateTime requestDate { get; set; }
        public string storeName { get; set; }
        public int totalPoint { get; set; }
        public string status { get; set; }
        public string statusText { get; set; }
        public string remark { get; set; }

        public Guid reqGuid { get; set; }
    }
}
