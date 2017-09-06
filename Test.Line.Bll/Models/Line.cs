using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.Line.Bll.Models
{
    public class LineModel 
    {
        public LinePointModel StartPoint { get; set; }
        public LinePointModel EndPoint { get; set; }
        public string Color { get; set; }
    }

    
}
