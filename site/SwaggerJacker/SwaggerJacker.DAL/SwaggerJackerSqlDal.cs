using SwaggerJacker.BusinessObjects;
using System.Collections.Generic;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwaggerJacker.DAL
{
    public class SwaggerJackerSqlDal : ITagDAL
    {
        #region Fields - Private
        private TagDBConnection _sqlConnection;
        private const string _fetchByUrlProcedureName = "GetTagsForPage";
        private const string _fetchTagByIdProcedureName = "GetTagById";
        private const string _fetchByImageSourceProcedureName = "GetTagsByImageSource";
        private const string _addTagProcedureName = "AddNewTag";
        private const string _updateTagProcedureName = "UpdateTag";


        private const string _tagParamId = @"Id";
        private const string _tagParamTitle = @"Title";
        private const string _tagParamDescription = @"Description";
        private const string _tagParamUrl = @"Url";
        private const string _tagParamCoordinateX = @"X";
        private const string _tagParamCoordinateY = @"Y";
        private const string _tagParamImage = @"Img";
        private const string _tagParamScore = @"Score";

        #endregion

        #region CTOR

        public SwaggerJackerSqlDal( string connectionString )
        {
            this._sqlConnection = new TagDBConnection( connectionString );
        }

        #endregion

        #region Methods - Public

        // ToDo: Stored Procedure should exclude tags marked inactive.
        public IEnumerable<Tag> GetTags( string pageUrl )
        {
            // Todo: Move to business objects layer

            if (pageUrl == null)
                pageUrl = string.Empty;

            // ToDo: Extract
            if (pageUrl.EndsWith("/")) pageUrl = pageUrl.Substring(0, pageUrl.Length - 1);


            List<Tag> tags = new List<Tag>();

            List<SqlParameter> procedureParameters = new List<SqlParameter>();
            procedureParameters.Add(new SqlParameter("@pageUrl", pageUrl));
            
            using ( IDataReader reader = _sqlConnection.ExecuteQuery( _fetchByUrlProcedureName, procedureParameters ) )
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
            if (id == null)
                return null;

            // ToDo: Extract
            Tag tag = new Tag();

            List<SqlParameter> procedureParameters = new List<SqlParameter>();
            procedureParameters.Add(new SqlParameter(_tagParamId, id));

            // ToDo: The execute query command should implement the Single Row behavior type
            using (IDataReader reader = _sqlConnection.ExecuteQuery(_fetchByUrlProcedureName, procedureParameters, CommandBehavior.SingleRow))
            {
                while (reader.Read())
                {
                    tag = new Tag
                    {
                        Id = (int)reader[0],
                        Title = (string)reader[1],
                        Description = (string)reader[2],
                        Url = (string)reader[3],
                        Img = (string)reader[4],
                        Coords = new Coordinates { x = (int)reader[5], y = (int)reader[6] },
                        Score = (int)reader[7]
                    };
                }
            }

            return tag;
        }

        public Tag AddTag(Tag tag)
        {
            Tag newTag = null;

            List<SqlParameter> procedureParameters = new List<SqlParameter>();
            procedureParameters.Add(new SqlParameter(_tagParamTitle, tag.Title));
            procedureParameters.Add(new SqlParameter(_tagParamDescription, tag.Description));
            procedureParameters.Add(new SqlParameter(_tagParamUrl, tag.Url));
            procedureParameters.Add(new SqlParameter(_tagParamImage, tag.Img));
            procedureParameters.Add(new SqlParameter(_tagParamScore, tag.Score));
            procedureParameters.Add(new SqlParameter(_tagParamCoordinateX, tag.Coords.x));
            procedureParameters.Add(new SqlParameter(_tagParamCoordinateY, tag.Coords.y));


            // ToDo: The execute query command should implement the Single Row behavior type
            using (IDataReader reader = _sqlConnection.ExecuteQuery(_addTagProcedureName, procedureParameters, CommandBehavior.SingleRow))
            {
                while (reader.Read())
                {
                    newTag = new Tag
                    {
                        Id = (int)reader[0],
                        Title = (string)reader[1],
                        Description = (string)reader[2],
                        Url = (string)reader[3],
                        Img = (string)reader[4],
                        Coords = new Coordinates { x = (int)reader[5], y = (int)reader[6] },
                        Score = (int)reader[7]
                    };
                }
            }

            return newTag;
        }

        //ToDo: Trim down this transaction
        public Tag UpdateTag(int id, int score)
        {
            Tag newTag = null;

            List<SqlParameter> procedureParameters = new List<SqlParameter>();
            procedureParameters.Add(new SqlParameter(_tagParamId, id));
            procedureParameters.Add(new SqlParameter(_tagParamScore, score));


            // ToDo: The execute query command should implement the Single Row behavior type
            using (IDataReader reader = _sqlConnection.ExecuteQuery(_updateTagProcedureName, procedureParameters, CommandBehavior.SingleRow))
            {
                while (reader.Read())
                {
                    newTag = new Tag
                    {
                        Id = (int)reader[0],
                        Title = (string)reader[1],
                        Description = (string)reader[2],
                        Url = (string)reader[3],
                        Img = (string)reader[4],
                        Coords = new Coordinates { x = (int)reader[5], y = (int)reader[6] },
                        Score = (int)reader[7]
                    };
                }
            }

            return newTag;
        }

        
        //ToDo: This should mark a flag inactive
        public bool RemoveTag(int id)
        {
            throw new NotImplementedException();
        }
        #endregion


    }
}
