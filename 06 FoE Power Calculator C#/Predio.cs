using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoECalculator
{
    public class Predio
    {
        public string Name { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

        public int RedBaseAttack { get; set; }
        public int RedBaseDefense { get; set; }
        public int BlueBaseAttack { get; set; }
        public int BlueBaseDefense { get; set; }

        public int RedCBGAttack { get; set; }
        public int RedCBGDefense { get; set; }
        public int BlueCBGAttack { get; set; }
        public int BlueCBGDefense { get; set; }

        public int RedEXPAttack { get; set; }
        public int RedEXPDefense { get; set; }
        public int BlueEXPAttack { get; set; }
        public int BlueEXPDefense { get; set; }

        public int RedIQAttack { get; set; }
        public int RedIQDefense { get; set; }
        public int BlueIQAttack { get; set; }
        public int BlueIQDefense { get; set; }

        public int TotalEspaco => Width * Height;
    }
}
