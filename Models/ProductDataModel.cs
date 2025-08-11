namespace tnki_line_sale_frontend.Models
{
    public class ProductDataModel
    {
        public Guid prodGuid { get; set; }
        public string prodCode { get; set; }
        public string prodName { get; set; }
        public string prodDesc { get; set; }
        public string prodImage { get; set; }
        public decimal prodPrice { get; set; }
        public string prodPackSize { get; set; }
        public string prodStatus { get; set; }
        public string prodRemark { get; set; }
        public int prodSeq { get; set; }
        public string prodExternalLink { get; set; }
    }
}
