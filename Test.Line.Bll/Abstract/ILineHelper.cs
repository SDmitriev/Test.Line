using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Test.Line.Bll.Models;

namespace Test.Line.Bll.Abstract
{
    public interface ILineHelper
    {
        LineModel GetLine();
        void SaveLine(LineModel line);
    }
}
