using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using tnki_line_sale_frontend.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace tnki_line_sale_frontend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;

        public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }
        internal void setDataIntoViewBag()
        {
            ViewBag.baseFront = _configuration.GetValue<string>("MySetting:baseFront");
            ViewBag.baseAPI = _configuration.GetValue<string>("MySetting:baseAPI");
            ViewBag.liffID = _configuration.GetValue<string>("MySetting:liffID");
        }
        public IActionResult MainPage(string state)
        {
            setDataIntoViewBag();
            MainState model = new MainState();
            model.state = (state == null ? "" : state.Trim());
            return View(model);
        }
        public IActionResult MainState(string state)
        {
            setDataIntoViewBag();
            MainState model = new MainState();
            model.state = (state == null ? "" : state.Trim());
            return View(model);
        }
        public IActionResult Register(string state)
        {
            setDataIntoViewBag();
            CustProfileModel model = new CustProfileModel();
            model.state = (state == null ? "" : state.Trim());
            model.custData = new CustModel();
            return View(model);
        }
        public IActionResult ProductListByCategory(string categoryId)
        {
            setDataIntoViewBag();
            ProductCategoryModel model = new ProductCategoryModel();
            model.prodCategoryId = (categoryId == null ? "1" : categoryId.Trim());
            return View(model);
        }

        [Route("/Home/BuyNow/{productId:int}")]
        public IActionResult BuyNow(string productId)
        {
            setDataIntoViewBag();
            return View();
        }

        [Route("/Home/ProductDetail/{productId:int}")]
        public ActionResult ProductDetail(int productId)
        {
            setDataIntoViewBag();
            ViewBag.ProductId = productId;
            var model = new ProductDataModel()
            {
                //prodCode = Convert.ToString(productId),
                //prodName = "[ของแถม งดจำหน่าย] เรนเจอร์ เอ็กซ์ตรีม ยากันยุงควันน้อย 8 ชม. แซนดัลวู้ด 1 กล่อง",
                //prodDesc = "<p><strong>***ผู้ประกอบการที่อยู่ในระบบ VAT รบกวนแจ้งข้อมูลกับเจ้าหน้าที่ เพื่อออกใบกำกับภาษี ทันที***</strong></p>\r\n<p><strong>(** ทางร้านขอสงวนสิทธิ์ ในการออกใบกำกับภาษีย้อนหลัง**)</strong>&nbsp;</p>\r\n<p><strong>ยาจุดกันยุงควันน้อยเจ้าแรกยอดขายอันดับ 1 ต่อเนื่อง 6 ปีซ้อน</strong></p>\r\n<ul>\r\n<li><strong>&ldquo;เรนเจอร์ เอ็กซ์ตรีม&rdquo;</strong> เร็วสุด แรงสุดของการไล่ยุง กลิ่นแซนดัลวู้ด</li>\r\n<li>สูตรประสิทธิภาพมีส่วนผสมของ เมโทฟลูทริน (Metofluthrin) 0.05% ออกฤทธิ์เฉพาะกับแมลงสามารถ ไล่ยุงดีที่สุดในตลาดยาจุดกันยุง</li>\r\n<li>ปลอดภัยรับรองมาตราฐานจาก อ.ย.ไทย เลขขึ้นทะเบียน วอส .656/2565</li>\r\n<li>ไม่เป็นอันตรายต่อสัตว์เลี้ยงลูกด้วยนมใช้ได้ทั้งคนและสัตว์เลี้ยง</li>\r\n<li>ควันน้อย ช่วยลดการเกิด PM 2.5</li>\r\n<li>สามารถไล่ยุงร้ายได้ 4 ชนิด ได้แก่ยุงลายบ้าน ยุงลายสวน ยุงรำคาญ และยุงก้นปล่อง</li>\r\n</ul>",
                //prodImage = "~/assets/img/product/3.png",
                //prodPrice = 101.00M,
                //prodPackSize = "15x15x5 cm.",
                //prodStatus = "ACT",
                //prodRemark = "",
                //prodSeq = 1,
                //prodExternalLink = "https://www.thanatkorn.com/%E0%B9%80%E0%B8%A3%E0%B8%99%E0%B9%80%E0%B8%88%E0%B8%AD%E0%B8%A3%E0%B9%8C-%E0%B9%80%E0%B8%AD%E0%B9%87%E0%B8%81%E0%B8%8B%E0%B9%8C%E0%B8%95%E0%B8%A3%E0%B8%B5%E0%B8%A1"
            };

            return View(model);
        }

        public IActionResult ShopingCart(string productId)
        {
            setDataIntoViewBag();
            return View();
        }

        public IActionResult Index()
        {
            setDataIntoViewBag();

            return View();
        }
        public IActionResult MemberCancel()
        {
            setDataIntoViewBag();

            return View();
        }
        public IActionResult LandingPage()
        {
            setDataIntoViewBag();
            return View();
        }

        public IActionResult UploadRec()
        {
            setDataIntoViewBag();
            UploadDataModel model = new UploadDataModel();
            model.lstStore = new List<StoreModel>();

            return View(model);
        }
        public IActionResult UploadRecView(Guid? reqGuid)
        {
            if (reqGuid == null || reqGuid.Equals(Guid.Empty))
            {
                return Redirect("History");
            }

            setDataIntoViewBag();
            RecDataDetail model = new RecDataDetail();
            model.lstRecImg = new List<RecImage>();
            model.recImg = new RecImage();
            model.reqGuid = (Guid)reqGuid;
            return View(model);
        }
        public IActionResult UploadRecEdit(Guid? reqGuid)
        {
            if (reqGuid == null || reqGuid.Equals(Guid.Empty))
            {
                return Redirect("History");
            }

            setDataIntoViewBag();
            UploadRecEdit model = new UploadRecEdit();
            model.lstStore = new List<StoreModel>();
            model.recDetail = new RecDataDetail();
            model.reqGuid = (Guid)reqGuid;

            return View(model);
        }
        public IActionResult History()
        {
            setDataIntoViewBag();
            CustProfileModel model = new CustProfileModel();
            model.state = "";
            model.custData = new CustModel();
            model.lstHist = new List<HistPointModel>();
            return View(model);
        }
        public IActionResult HistRedeem()
        {
            setDataIntoViewBag();
            CustProfileModel model = new CustProfileModel();
            model.state = "";
            model.custData = new CustModel();
            model.lstHistRedeem = new List<RewardData>();
            return View(model);
        }

        public IActionResult Profile()
        {
            setDataIntoViewBag();
            CustProfileModel model = new CustProfileModel();
            model.custData = new CustModel();
            return View(model);
        }
        public IActionResult EditProfile()
        {
            setDataIntoViewBag();
            CustProfileModel model = new CustProfileModel();
            model.state = "";
            model.custData = new CustModel();
            return View(model);
        }
        public IActionResult EditContactProfile()
        {
            setDataIntoViewBag();
            CustProfileModel model = new CustProfileModel();
            model.state = "";
            model.custData = new CustModel();
            model.lstDistrict = new List<AddrDistrictModel>();
            model.lstProvince = new List<AddrProviceModel>();
            model.lstSubDistrict = new List<AddrSubDistrictModel>();
            return View(model);
        }
        public IActionResult Reward()
        {
            setDataIntoViewBag();
            RewardModel model = new RewardModel();
            model.lstRewardLowTier = new List<RewardData>();
            model.lstRewardHighTier = new List<RewardData>();
            model.custData = new CustModel();
            return View(model);
        }

        public IActionResult Ranking()
        {
            setDataIntoViewBag();
            LeaderBoardModel model = new LeaderBoardModel();
            model.lstRanking_01 = new List<LeaderBoard>();
            model.lstRanking_02 = new List<LeaderBoard>();
            model.lstRanking_03 = new List<LeaderBoard>();
            model.lstRanking_04 = new List<LeaderBoard>();
            model.ownRank = new LeaderBoard();

            return View(model);
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult AddToCart()
        {           
            return Ok();
        }
    }
}
