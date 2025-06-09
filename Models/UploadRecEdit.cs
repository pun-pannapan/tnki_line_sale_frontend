namespace tnki_line_sale_frontend.Models
{
    public class UploadRecEdit {
        public Guid reqGuid { get; set; }
        public Guid storeGuid { get; set; }
        public List<StoreModel> lstStore { get; set; }
        public RecDataDetail recDetail { get; set; }
    }
}
