using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using tnki_line_sale_frontend.Models;

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
    }
}
