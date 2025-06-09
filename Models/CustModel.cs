namespace tnki_line_sale_frontend.Models
{
    public class CustModel
    {
        public bool custCheckTopSpender { get; set; }
        public Guid custGuid { get; set; }
        public string custFirstName { get; set; }
        public string custLastName { get; set; }
        public string custLineId { get; set; }
        public string custLineImg { get; set; }
        public string custLineDisplayName { get; set; }
        public string custTel { get; set; }
        public bool custCheckPrivacy { get; set; }
        public bool custCheckTerm { get; set; }
        public string custStatus { get; set; }
        public string custAddr01 { get; set; }
        public string custAddr02 { get; set; }
        public long custProvId { get; set; }
        public long custDistId { get; set; }
        public long custSubDistId { get; set; }
        public string provName { get; set; }
        public string distName { get; set; }
        public string subDistName { get; set; }
        public string postCode { get; set; }
    }
}
