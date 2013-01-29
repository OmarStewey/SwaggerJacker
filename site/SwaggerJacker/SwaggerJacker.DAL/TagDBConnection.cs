using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwaggerJacker.DAL
{
    public class TagDBConnection
    {
        #region Fields - Private
        private string _connectionString { get; set; } 
        #endregion

        #region CTOR
        public TagDBConnection( string connectionString )
        {
            this._connectionString = connectionString;
        }
        #endregion

        #region Methods - Public
        
        public IDataReader ExecuteQuery( string query )
        {
            SqlConnection connection = new SqlConnection( _connectionString );
            SqlCommand cmd = null;
            try
            {
                cmd = new SqlCommand( query, connection );
                connection.Open();
                IDataReader reader = cmd.ExecuteReader( CommandBehavior.CloseConnection );
                return reader;
            }
            catch
            {
                // Close open resources
                if (cmd != null) cmd.Dispose();
                if (connection != null) connection.Close();
                throw;
            }
        
        }

        public IDataReader ExecuteQuery( SqlCommand procedure )
        {
            SqlConnection connection = new SqlConnection( _connectionString );
            procedure.Connection = connection;

            try
            {
                connection.Open();
                IDataReader reader = procedure.ExecuteReader( CommandBehavior.CloseConnection );
                return reader;
            }
            catch
            {
                // Close open resources
                if (procedure != null) procedure.Dispose();
                if (connection != null) connection.Close();
                throw;
            }
        }

        #endregion
    }
}
