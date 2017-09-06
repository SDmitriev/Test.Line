using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.Line.Bll.Concrete
{
    public class ColorHelper
    {
        public string NextColor()
        {
            var colors = new[] {"#FFFF00","#4682B4","#FF4500","#00FF00","#F5FFFA"};
            Random rnd = new Random();
            return colors[rnd.Next(0, 4)];
        }
    }
}
