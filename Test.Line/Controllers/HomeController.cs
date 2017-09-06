using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Test.Line.Bll.Abstract;
using Test.Line.Bll.Models;

namespace Test.Line.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var helper = DependencyResolver.Current.GetService<ILineHelper>();
            var model = helper.GetLine();
            return View(model);
        }

        public void Update(LineModel model)
        {
            var helper = DependencyResolver.Current.GetService<ILineHelper>();
            helper.SaveLine(model);
        }

    }
}