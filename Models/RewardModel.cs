namespace tnki_line_sale_frontend.Models
{
    public class RewardModel
    {
        public string rewardName { get; set; }
        public CustModel custData { get; set; }
        public int totalPoint { get; set; }
        public Guid rewardGuid { get; set; }
        public List<RewardData> lstRewardHighTier { get; set; }
        public List<RewardData> lstRewardLowTier { get; set; }
    }
}
