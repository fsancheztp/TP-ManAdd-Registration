namespace SRManAdd_Backend
{
    public static class AppSettings
    {
        public static string ConnectionString { get; private set; } = null;

        public static void Initialize(IConfiguration config)
        {
            ConnectionString = config.GetValue<string>("ApiConfiguration:DBConnectionString");
        }
    }
}
