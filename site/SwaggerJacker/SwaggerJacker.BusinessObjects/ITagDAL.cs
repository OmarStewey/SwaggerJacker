using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwaggerJacker.BusinessObjects
{
    public interface ITagDAL
    {
        IEnumerable<Tag> GetTags(string pageUrl);
        Tag GetTag(int id);
        Tag AddTag(Tag tag);
        Tag UpdateTag(int id, int score);
        bool RemoveTag(int id);
    }
}
