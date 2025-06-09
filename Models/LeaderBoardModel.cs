namespace tnki_line_sale_frontend.Models
{
    public class LeaderBoardModel
    {
        public bool isShowCounter { get; set; }        
        public bool isCloseCamp { get; set; }
        public bool isOpenCamp { get; set; }
        public string topSpenderPeriod { get; set; }
        public DateTime topSpenderEndDate { get; set; }
        public LeaderBoard ownRank { get; set; }
        public List<LeaderBoard> lstRanking_01 { get; set; }
        public List<LeaderBoard> lstRanking_02 { get; set; }
        public List<LeaderBoard> lstRanking_03 { get; set; }
        public List<LeaderBoard> lstRanking_04 { get; set; }
    }
}
