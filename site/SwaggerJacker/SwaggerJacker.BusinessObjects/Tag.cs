using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwaggerJacker.BusinessObjects
{
    public class Tag
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Img { get; set; }
        public int Score { get; set; }
        public Coordinates Coords { get; set; }
    }
}