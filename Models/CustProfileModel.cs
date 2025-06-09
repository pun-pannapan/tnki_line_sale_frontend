namespace tnki_line_sale_frontend.Models
{
    public class CustProfileModel
    {
        public string state { get; set; }
        public CustModel custData { get; set; }
        public int totalPoint { get; set; }
        public List<RewardData> lstHistRedeem { get; set; }
        public List<HistPointModel> lstHist { get; set; }
        public List<AddrProviceModel> lstProvince { get; set; }
        public List<AddrDistrictModel> lstDistrict { get; set; }
        public List<AddrSubDistrictModel> lstSubDistrict { get; set; }
    }
}
