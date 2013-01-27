using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SwaggerJacker.BusinessObjects;

namespace SwaggerJacker.DAL
{
    public class SwaggerJackerSqlDal : ITagDAL
    {
        #region Fields - Private
        private TagDBConnection _sqlConnection; 
        #endregion

        #region CTOR

        public SwaggerJackerSqlDal( string connectionString )
        {
            this._sqlConnection = new TagDBConnection( connectionString );
        } 
        
        #endregion

        #region Methods - Public

        public IEnumerable<Tag> GetTags( string pageUrl )
        {
            throw new NotImplementedException();
        }

        public Tag GetTag( int id )
        {
            throw new NotImplementedException();
        } 

        #endregion
    }
}
