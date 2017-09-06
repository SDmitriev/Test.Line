using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Test.Line.Bll.Concrete;
using Test.Line.Bll.Models;

namespace Test.Line.Bll.Abstract
{
    public class LineHelper :ILineHelper
    {
        private ICacheStoreHelper<LineModel> _cacheStoreHelper;
        private ColorHelper _colorHelper;

        public LineHelper(ICacheStoreHelper<LineModel> cacheStoreHelper, ColorHelper colorHelper)
        {
            _cacheStoreHelper = cacheStoreHelper;
            _colorHelper = colorHelper;
        }
        public LineModel GetLine()
        {
            var line = _cacheStoreHelper["line"];
            if(line == null)
            {
                Random rnd = new Random();
                line = new LineModel
                {
                    EndPoint = new LinePointModel
                    {
                        X = rnd.Next(50, 100),
                        Y = rnd.Next(50, 100)
                    },
                    StartPoint = new LinePointModel
                    {
                        X = rnd.Next(0, 50),
                        Y = rnd.Next(0, 50)
                    },
                    Color = _colorHelper.NextColor()
                };
                _cacheStoreHelper.Add("line", line);
            }

            return line;
        }

        public void SaveLine(LineModel line)
        {
            _cacheStoreHelper.Remove("line");
            _cacheStoreHelper.Add("line", line);            
        }
    }
}
