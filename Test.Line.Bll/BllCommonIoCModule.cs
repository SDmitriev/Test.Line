using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Test.Line.Bll.Abstract;
using Test.Line.Bll.Concrete;

namespace Test.Line.Bll
{
    public sealed class BllCommonIoCModule : Module
    {
        #region Overridden Methods

        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);
            
            builder.RegisterType<LineHelper>().As<ILineHelper>();
            builder.Register(x => new ColorHelper());


            builder.RegisterGeneric(typeof(AspCacheStoreHelper<>)).As(typeof(ICacheStoreHelper<>));
        }

        #endregion
    }
}
