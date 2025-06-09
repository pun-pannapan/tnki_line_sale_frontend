namespace tnki_line_sale_frontend.Models
{
    public class UploadDataModel
    {
        public Guid storeGuid { get; set; }
        public List<StoreModel> lstStore { get; set; }
    }
}
