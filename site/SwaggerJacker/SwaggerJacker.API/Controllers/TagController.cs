using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using SwaggerJacker.BusinessObjects;
using SwaggerJacker.DAL;

using System.Configuration;

namespace SwaggerJacker.API.Controllers
{
    public class TagController : ApiController
    {
        #region Fields - Private
        private const string _dbConnectionStringName
            = "SwaggerJackerDbConnection";

        private ITagDAL _dal;
        #endregion

        #region CTOR
        public TagController()
        {
            string connectionString
                = ConfigurationManager.ConnectionStrings[_dbConnectionStringName].ConnectionString;

            _dal = new SwaggerJackerSqlDal( _dbConnectionStringName );
        }
        #endregion

        #region Methods - Public

        // GET
        // Fetch all tags for a url.

        [HttpGet]
        public IEnumerable<Tag> Index( string url )
        {
            List<Tag> allTags = _dal.GetTags( url ).ToList<Tag>();
            return allTags;
        }

        #endregion
    }
}
