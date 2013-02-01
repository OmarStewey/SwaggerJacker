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
        public TagDBConnection(string connectionString)
        {
            this._connectionString = connectionString;
        }
        #endregion

        #region Methods - Public

        public IDataReader ExecuteQuery(string procedureName, List<SqlParameter> procedureParameters)
        {
            SqlConnection connection = new SqlConnection(_connectionString);
            SqlCommand procedure = new SqlCommand(procedureName, connection);
            procedure.CommandType = CommandType.StoredProcedure;

            foreach (SqlParameter procParam in procedureParameters)
                procedure.Parameters.Add(procParam);

            try
            {
                connection.Open();
                IDataReader reader = procedure.ExecuteReader(CommandBehavior.CloseConnection);
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

        public IDataReader ExecuteQuery(string procedureName, List<SqlParameter> procedureParameters, CommandBehavior behavior)
        {
            SqlConnection connection = new SqlConnection(_connectionString);
            SqlCommand procedure = new SqlCommand(procedureName, connection);
            procedure.CommandType = CommandType.StoredProcedure;
            
            foreach (SqlParameter procParam in procedureParameters)
                procedure.Parameters.Add(procParam);

            try
            {
                connection.Open();
                IDataReader reader = procedure.ExecuteReader(CommandBehavior.CloseConnection);
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
