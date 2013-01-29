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

        /// <summary>
        /// Execute a Stored Procedure against a target database.
        /// </summary>
        /// <param name="procedureName">Name of Stored Procedure.</param>
        /// <param name="procedureParameters">Collection of Key Value pairs representing parameters and values.</param>
        /// <returns></returns>
        public IDataReader ExecuteProcedure( string procedureName, Dictionary<string, string> procedureParameters )
        {
            SqlConnection connection = new SqlConnection( _connectionString );
            SqlCommand cmd = null;

            AddProcedureParameters( cmd, procedureParameters );

            try
            {
                cmd = new SqlCommand( procedureName, connection );
                cmd.CommandType = CommandType.StoredProcedure;

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

        #endregion

        #region Methods - Private

        /// <summary>
        /// Add collection of parameters and values to a stored procedure.
        /// </summary>
        /// <param name="cmd">Sql command with stored procedure.</param>
        /// <param name="procedureParameters">Collection of procedure parameters and values.</param>
        private void AddProcedureParameters( SqlCommand cmd, Dictionary<string, string> procedureParameters )
        {
            foreach ( var key in procedureParameters.Keys )
                cmd.Parameters.Add( new SqlParameter( key, procedureParameters[key] ) );
        }

        #endregion
    }
}
