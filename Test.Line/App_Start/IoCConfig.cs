using Autofac.Core;
using Magora.Common.Concrete.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Test.Line.Bll;

namespace Test.Line.App_Start
{
    public class IoCConfig
    {
        public static void Register()
        {
            Initialize();
        }

        public static void Initialize()
        {

            IoC.Initialize(new BllCommonIoCModule());
        }
    }
}