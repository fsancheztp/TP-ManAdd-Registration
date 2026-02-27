namespace SRManAdd_Backend
{
    using System;
    using System.Data.SqlClient;
    using Dapper;

    public class Material
    {
        public int Id { get; private set; }
        public int PLC_ID { get; private set; }
        public string Name { get; private set; }
        public string SiteMaterialAlias { get; private set; }

        public Material() {
            Id = 0;
            PLC_ID = 0;
            Name = "";
            SiteMaterialAlias = "";
        } // Empty constructor

        public void getByPLCId(int plcId)
        {
            try
            {
                using var conn = new SqlConnection(AppSettings.ConnectionString);
                string sql = @"SELECT Id, PLC_ID, Name, SiteMaterialAlias 
                           FROM TPMDB.Material 
                           WHERE PLC_ID = @plcId";

                var material = conn.QuerySingleOrDefault<Material>(sql, new { plcId });

                if (material == null)
                    throw new InvalidOperationException($"No material found for PLC_ID = {plcId}");

                CopyFrom(material);
            }
            catch (SqlException ex)
            {
                throw new ApplicationException("Database error while loading material by PLC_ID.", ex);
            }
        }

        public void getByAlias(string alias)
        {
            try
            {
                using var conn = new SqlConnection("your-connection-string");
                string sql = @"SELECT Id, PLC_ID, Name, SiteMaterialAlias 
                           FROM TPMDB.Material 
                           WHERE SiteMaterialAlias = @alias";

                var material = conn.QuerySingleOrDefault<Material>(sql, new { alias });

                if (material == null)
                    throw new InvalidOperationException($"No material found for SiteMaterialAlias = {alias}");

                CopyFrom(material);
            }
            catch (SqlException ex)
            {
                throw new ApplicationException("Database error while loading material by alias.", ex);
            }
        }

        private void CopyFrom(Material source)
        {
            Id = source.Id;
            PLC_ID = source.PLC_ID;
            Name = source.Name;
            SiteMaterialAlias = source.SiteMaterialAlias;
        }
    }
}
