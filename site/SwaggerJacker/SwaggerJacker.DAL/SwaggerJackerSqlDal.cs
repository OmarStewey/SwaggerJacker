using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
        private const string _fetchByUrlProcedureName = "GetTagsForPage";
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
            List<Tag> tags = new List<Tag>();
            
            Dictionary<string, string> procedureParams = new Dictionary<string, string>();
            procedureParams.Add("@pageUrl", pageUrl);

            using ( IDataReader reader = _sqlConnection.ExecuteQuery( _fetchByUrlProcedureName, procedureParams ) )
            {
                while (reader.Read())
                {
                    tags.Add( new Tag
                    {
                        Id = (int)reader[0],
                        Title = (string)reader[1],
                        Description = (string)reader[2],
                        Url = (string)reader[3],
                        Img = (string)reader[4],
                        Coords = new Coordinates { x = (int)reader[5], y = (int)reader[6] },
                        Score = (int)reader[7]
                    } );
                }
            }

            return tags;
        }

        public Tag GetTag( int id )
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
