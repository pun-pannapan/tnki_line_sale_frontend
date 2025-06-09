namespace tnki_line_sale_frontend.Models
{
    public class StoreModel
    {
        public Guid storeGuid { get; set; }
        public int storeSeq { get; set; }
        public string storeGroup { get; set; }
        public string storeName { get; set; }
        public string storeImage { get; set; }
        public string storeSampRec { get; set; }
        public string storeStatus { get; set; }
        public string storeRemark { get; set; }
    }
}
