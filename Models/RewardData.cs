namespace tnki_line_sale_frontend.Models
{
    public class RewardData
    {
        public bool isEnable { get; set; }
        public Guid rewardGuid { get; set; }
        public int rewardSeq { get; set; }
        public string rewardName { get; set; }
        public string rewardSubName { get; set; }
        public string rewardImage { get; set; }
        public string rewardType { get; set; }
        public int rewardBurnPoint { get; set; }
        public int rewardLimitPerCust { get; set; }
        public int rewardTotalStock { get; set; }
        public int rewardRemainStock { get; set; }
        public string rewardStoreGroup { get; set; }
        public int rewardMinPointCond { get; set; }
        public string rewardStatus { get; set; }
        public string rewardRemark { get; set; }
        public int custSumRemainPoint { get; set; }
        public Guid redmHistGuid { get; set; }
        public Guid redmHistSumGuid { get; set; }
        public Guid redmHistRedmGuid { get; set; }
        public int redmHistQty { get; set; }
        public int redmHistPointPerUnit { get; set; }    
        public string redmHistTracking { get; set; }
        public DateTime redmHistCreateDate { get; set; }
        public string redmHistCreateDate_str { get; set; }
        public string deliveryTracking { get; set; }
    }
}
