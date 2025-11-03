using SRManAdd_Backend;
using System.Data;
using System.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials()
               .SetIsOriginAllowed(origin => true);
    });
});

var app = builder.Build();

// Use CORS
app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

#region ManAdds

app.MapGet("/ManAdds/getOpenManAdds", (IConfiguration config) =>
{
    var cs = config.GetValue<string>("ApiConfiguration:DBConnectionString");
    var query = config.GetValue<string>("ApiConfiguration:getOpenManAdds");
    var ManAdds = new List<ManAdd>();
    var cn = new System.Data.SqlClient.SqlConnection(cs);
    try
    {
        cn.Open();
        using (var cmd = new System.Data.SqlClient.SqlCommand(query, cn))
        {
            var da = new System.Data.SqlClient.SqlDataAdapter(cmd);
            var dt = new System.Data.DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    ManAdds.Add(new ManAdd
                    {
                        Id = (int)row.ItemArray[0],
                        PhaseID = (int)row.ItemArray[1],
                        PhaseName = row.ItemArray[2].ToString(),
                        MaterialID = (int)row.ItemArray[3],
                        MaterialName = row?.ItemArray[4]?.ToString(),
                        TargetAmount = row.ItemArray[5] == DBNull.Value ? 0 : (float)row.ItemArray[5],
                        ActualAmount = row.ItemArray[6] == DBNull.Value ? 0 : (float)row.ItemArray[6],
                        StartDateTime = (row.ItemArray[7] == DBNull.Value) ? null : (DateTime)row.ItemArray[7],
                        EndDateTime = (row.ItemArray[8] == DBNull.Value) ? null : (DateTime)row.ItemArray[8],
                        RegisteredBy = row?.ItemArray[9]?.ToString(),
                        PLCWorkID = row?.ItemArray[10] == DBNull.Value ? 0 : (int)row.ItemArray[10],
                        RegistrationStatus = row?.ItemArray[11]?.ToString(),
                        EquipmentName = row?.ItemArray[12]?.ToString()
                    });

                }
            }
        }
    }
    catch (Exception ex)
    {
        return (null);
    }

    return ManAdds.ToArray();
})
.WithName("ManAdds.GetOpenManAdds");

app.MapGet("/ManAdds/getOpenManAdd", (int id, IConfiguration config) =>
{
    var ManAdds = new List<ManAdd>();
    var cs = config.GetValue<string>("ApiConfiguration:DBConnectionString");
    var query = config.GetValue<string>("ApiConfiguration:getOpenManAdd");    
    var cn = new SqlConnection(cs);
    try
    {
        cn.Open();
        using (var cmd = new SqlCommand(query, cn))
        {
            var da = new SqlDataAdapter(cmd);
            var PId = new SqlParameter("@id", SqlDbType.Int);
            PId.Value = id;
            cmd.Parameters.Add(PId);
            cmd.Prepare();
            var dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    ManAdds.Add(new ManAdd
                    {
                        Id = (int)row.ItemArray[0],
                        PhaseID = (int)row.ItemArray[1],
                        PhaseName = row?.ItemArray[2]?.ToString(),
                        MaterialID = (int)row.ItemArray[3],
                        MaterialName = row?.ItemArray[4]?.ToString(),
                        TargetAmount = row.ItemArray[5] == DBNull.Value ? 0 : (float)row.ItemArray[5],
                        ActualAmount = row.ItemArray[6] == DBNull.Value ? 0 : (float)row.ItemArray[6],
                        StartDateTime = (row.ItemArray[7] == DBNull.Value) ? null : (DateTime)row.ItemArray[7],
                        EndDateTime = (row.ItemArray[8] == DBNull.Value) ? null : (DateTime)row.ItemArray[8],
                        RegisteredBy = row.ItemArray[9].ToString(),
                        PLCWorkID = (int)row.ItemArray[10],
                        RegistrationStatus = row.ItemArray[11].ToString(),
                        EquipmentName = row.ItemArray[12].ToString()
                    });

                }
            }
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }

    return Results.Json(ManAdds[0]);
})
.WithName("ManAdds.GetOpenManAdd");

app.MapPut("/ManAdds/UpdateOpenManAdd", (int id, ManAdd manAdd, IConfiguration config) =>
{
    var cs = config.GetValue<string>("ApiConfiguration:DBConnectionString");
    var query = config.GetValue<string>("ApiConfiguration:UpdateOpenManAdd");
    var cn = new System.Data.SqlClient.SqlConnection(cs);
    try
    {
        cn.Open();
        using (var cmd = new SqlCommand(query, cn))
        {
            var ActualAmount = new SqlParameter("@actualAmount", System.Data.SqlDbType.Real);
            var RegisteredBy = new SqlParameter("@registeredBy", System.Data.SqlDbType.NVarChar,50);
            var Id = new SqlParameter("@id", System.Data.SqlDbType.Int);
            ActualAmount.Value = manAdd.ActualAmount;
            RegisteredBy.Value = manAdd.RegisteredBy;
            Id.Value = manAdd.Id;
            System.Data.SqlClient.SqlParameter[] parameters = { ActualAmount, RegisteredBy, Id };
            cmd.Parameters.AddRange(parameters);
            cmd.Prepare();
            cmd.ExecuteNonQuery();            
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }

    return Results.StatusCode(200);
})
.WithName("ManAdds.UpdateOpenManAdd");

#endregion

#region ManAddsLots
/*ManAdds Lots*/

app.MapGet("/ManAdds/getManAddLots", (int ManAddId, IConfiguration config) =>
{
    var Lots = new List<ManAddLot>();
    var cs = config.GetValue<string>("ApiConfiguration:DBConnectionString");
    var query = config.GetValue<string>("ApiConfiguration:ManAdds.getManAddLots");
    var cn = new SqlConnection(cs);
    try
    {
        cn.Open();
        using (var cmd = new SqlCommand(query, cn))
        {
            var PManAddId = new SqlParameter("@id", System.Data.SqlDbType.Int);
            PManAddId.Value = ManAddId;
            cmd.Parameters.Add(PManAddId);
            cmd.Prepare();
            var da = new SqlDataAdapter(cmd);
            var dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                foreach (System.Data.DataRow row in dt.Rows)
                {
                    Lots.Add(new ManAddLot
                    {
                        Id = (int)row?.ItemArray[0],
                        ManAdds_Registration_Id = (int)row.ItemArray[1],
                        ActualAmount = (float)row.ItemArray[2],
                        LastUpdateAt = (row.ItemArray[3] == DBNull.Value) ? null : (DateTime)row.ItemArray[3],
                        RegisteredBy = row?.ItemArray[4]?.ToString(),
                        LotId = row?.ItemArray[5]?.ToString()
                    });

                }
            }
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }

    return Results.Json(Lots);
})
.WithName("ManAdds.getManAddLots");

app.MapPost("/ManAdds/addManAddLot", (ManAddLot Lot, IConfiguration config) =>
{
    int result = 0;
    var cs = config.GetValue<string>("ApiConfiguration:DBConnectionString");
    var query = config.GetValue<string>("ApiConfiguration:ManAdds.addManAddLot");
    var cn = new SqlConnection(cs);
    try
    {
        cn.Open();       
        
        using (var cmd = new SqlCommand(query, cn))
        {
            var PmanAddId = new SqlParameter("@manAddId", System.Data.SqlDbType.Int);
            var PactualAmount = new SqlParameter("@actualAmount", System.Data.SqlDbType.Real);
            var PregisteredBy = new SqlParameter("@registeredBy", System.Data.SqlDbType.NVarChar, 50);
            var PlotId = new SqlParameter("@lotId", System.Data.SqlDbType.NVarChar, 100);

            PmanAddId.Value = Lot.ManAdds_Registration_Id;
            PactualAmount.Value = Lot.ActualAmount;
            PregisteredBy.Value = Lot.RegisteredBy;
            PlotId.Value = Lot.LotId;

            SqlParameter[] parameters = { PmanAddId, PactualAmount, PregisteredBy, PlotId };

            cmd.Parameters.AddRange(parameters);
            cmd.Prepare();

            result = cmd.ExecuteNonQuery();
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }

    return Results.Json(new { Value = result });
})
.WithName("ManAdds.addManAddLot");

app.MapPost("/ManAdds/lotValidation", (LotValidation lotValidation, IConfiguration config) =>
{
    var cs = config.GetValue<string>("ApiConfiguration:DBConnectionString");
    var query = config.GetValue<string>("ApiConfiguration:ManAdds.validateScan");
    var cn = new SqlConnection(cs);
    var lotValidationResponse = new ValidationResponse();
    try
    {
        cn.Open();
        using (var cmd = new SqlCommand(query, cn))
        {
            var PtemplateName = new SqlParameter("@TemplateName", System.Data.SqlDbType.NVarChar, 50);
            var PbarCode1 = new SqlParameter("@BarCode1", System.Data.SqlDbType.NVarChar, 2000);
            var PbarCode2 = new SqlParameter("@BarCode2", System.Data.SqlDbType.NVarChar, 2000);
            var PbarCode3 = new SqlParameter("@BarCode3", System.Data.SqlDbType.NVarChar, 2000);
            var PmaterialId = new SqlParameter("@MaterialId", System.Data.SqlDbType.NVarChar, 100);
            var PmaterialValidation = new SqlParameter("@MaterialValidation", System.Data.SqlDbType.Bit);

            PtemplateName.Value = lotValidation.TemplateName;
            PbarCode1.Value = lotValidation.BarCode1;
            PbarCode2.Value = lotValidation.BarCode2;
            PbarCode3.Value = lotValidation.BarCode3;
            PmaterialId.Value = lotValidation.MaterialId;
            PmaterialValidation.Value = lotValidation.MaterialValidation;

            SqlParameter[] parameters = { PtemplateName, PbarCode1, PbarCode2, PbarCode3, PmaterialId, PmaterialValidation };

            cmd.Parameters.AddRange(parameters);
            cmd.Prepare();

            var da = new SqlDataAdapter(cmd);
            var dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    lotValidationResponse.LotId = row?.ItemArray[0]?.ToString();
                    lotValidationResponse.ExpirationDate = row?.ItemArray[1]?.ToString();
                    lotValidationResponse.Quantity = row?.ItemArray[2]?.ToString();
                    lotValidationResponse.Par1 = row?.ItemArray[3]?.ToString();
                    lotValidationResponse.MaterialID = row?.ItemArray[4]?.ToString();
                    lotValidationResponse.Par3 = row?.ItemArray[5]?.ToString();
                    lotValidationResponse.Par4 = row?.ItemArray[6]?.ToString();
                    lotValidationResponse.Par5 = row?.ItemArray[7]?.ToString();
                    lotValidationResponse.Par6 = row?.ItemArray[8]?.ToString();
                    lotValidationResponse.Par7 = row?.ItemArray[9]?.ToString();
                    lotValidationResponse.Par8 = row?.ItemArray[10]?.ToString();
                    lotValidationResponse.Par9 = row?.ItemArray[11]?.ToString();
                    lotValidationResponse.Par10 = row?.ItemArray[12]?.ToString();
                    lotValidationResponse.Result = row?.ItemArray[13]?.ToString();
                    lotValidationResponse.Validation = row?.ItemArray[14]?.ToString();
                }

            }
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }

    return Results.Json(lotValidationResponse);
})
.WithName("ManAdds.lotValidation");

app.MapDelete("/ManAdds/deleteManAddLot", (int id, IConfiguration config) =>
{
    int result = 0;
    var cs = config.GetValue<string>("ApiConfiguration:DBConnectionString");
    var query = config.GetValue<string>("ApiConfiguration:ManAdds.deleteManAddLot");
    var cn = new SqlConnection(cs);
    try
    {
        cn.Open();
        using (var cmd = new System.Data.SqlClient.SqlCommand(query, cn))
        {
            var Pid = new System.Data.SqlClient.SqlParameter("@id", System.Data.SqlDbType.Int);           

            Pid.Value = id;          

            cmd.Parameters.Add(Pid);
            cmd.Prepare();

            result = cmd.ExecuteNonQuery();
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }

    return Results.Json(new { Value = result });
})
.WithName("ManAdds.deleteManAddLot");

#endregion

#region Labels
app.MapGet("/LabelManagement/getTemplates", (IConfiguration config) =>
{    
    var cs = config.GetValue<string>("ApiConfiguration:DBConnectionString");
    var query = config.GetValue<string>("ApiConfiguration:LabelManagement.getTemplates");
    var cn = new SqlConnection(cs);
    var labelTemplate = new List<LabelTemplate>();
    try
    {
        cn.Open();
        using (var cmd = new SqlCommand(query, cn))
        {
            var da = new SqlDataAdapter(cmd);
            var dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    labelTemplate.Add(new LabelTemplate()
                    {
                        Id = (int)row?.ItemArray[0],
                        TemplateName = row?.ItemArray[1]?.ToString(),
                        BarCode1 = row?.ItemArray[2]?.ToString(),
                        BarCode2 = row?.ItemArray[3]?.ToString(),
                        BarCode3 = row?.ItemArray[4]?.ToString(),
                        LotId = row?.ItemArray[5]?.ToString(),
                        ExpirationDate = row?.ItemArray[6]?.ToString(),
                        Quantity = row?.ItemArray[7]?.ToString(),
                        Par1 = row?.ItemArray[8]?.ToString(),
                        Par2 = row?.ItemArray[9]?.ToString(),
                        Par3 = row?.ItemArray[10]?.ToString(),
                        Par4 = row?.ItemArray[11]?.ToString(),
                        Par5 = row?.ItemArray[12]?.ToString(),
                        Par6 = row?.ItemArray[13]?.ToString(),
                        Par7 = row?.ItemArray[14]?.ToString(),
                        Par8 = row?.ItemArray[15]?.ToString(),
                        Par9 = row?.ItemArray[16]?.ToString(),
                        Par10 = row?.ItemArray[17]?.ToString(),
                        UpdatedBy = row?.ItemArray[19]?.ToString(),
                        isActive = (bool)row.ItemArray[20]
                    });
                }
            }
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }

    return Results.Json(labelTemplate);
})
.WithName("LabelManagement.getTemplates");
#endregion

#region AutoBatch Execution
/*AutoBatch Execution*/

app.MapGet("/AutoBatch/getStatus", (IConfiguration config) =>
{
    string result = "";
    var cs = config.GetValue<string>("ApiConfiguration:DBConnectionString");
    var query = config.GetValue<string>("ApiConfiguration:AutoBatch.getStatus");
    var cn = new System.Data.SqlClient.SqlConnection(cs);
    try
    {
        cn.Open();
        using (var cmd = new System.Data.SqlClient.SqlCommand(query, cn))
        {
            result = (string)cmd.ExecuteScalar();
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }

    return Results.Json(new { Value = result });
})
.WithName("AutoBatch.getStatus");

app.MapPut("/AutoBatch/updateStatus", (string value, IConfiguration config) =>
{
    int result = 0;
    var cs = config.GetValue<string>("ApiConfiguration:DBConnectionString");
    var query = config.GetValue<string>("ApiConfiguration:AutoBatch.updateStatus");
    var cn = new System.Data.SqlClient.SqlConnection(cs);
    try
    {
        cn.Open();
        using (var cmd = new System.Data.SqlClient.SqlCommand(query, cn))
        {
            var PValue = new System.Data.SqlClient.SqlParameter("value", System.Data.SqlDbType.NVarChar, 50);
            PValue.Value = value;
            cmd.Parameters.Add(PValue);
            cmd.Prepare();
            result = cmd.ExecuteNonQuery();
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }

    return Results.Json(new { Value = result });
})
.WithName("AutoBatch.updateStatus");

#endregion

#region ManAddReports

app.MapGet("/ManAddReports/getAll", (IConfiguration config) =>
{
    var cs = config.GetValue<string>("ApiConfiguration:DBConnectionString");
    var query = config.GetValue<string>("ApiConfiguration:ManAddReports.getAll");
    if (query == null)
        query = "SELECT * FROM x_ManAdds_Registration WHERE RegistrationStatus <> 'Running' ORDER BY StartDateTime ASC";

    var ManAdds = new List<ManAdd>();
    var cn = new System.Data.SqlClient.SqlConnection(cs);
    try
    {
        cn.Open();
        using (var cmd = new System.Data.SqlClient.SqlCommand(query, cn))
        {
            cmd.CommandType = System.Data.CommandType.Text;
            var da = new System.Data.SqlClient.SqlDataAdapter(cmd);
            var dt = new System.Data.DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                foreach (System.Data.DataRow row in dt.Rows)
                {
                    ManAdds.Add(new ManAdd
                    {
                        Id = (int)row.ItemArray[0],
                        PhaseID = (int)row.ItemArray[1],
                        PhaseName = row.ItemArray[2].ToString(),
                        MaterialID = (int)row.ItemArray[3],
                        MaterialName = row.ItemArray[4].ToString(),
                        TargetAmount = (float)row.ItemArray[5],
                        ActualAmount = (float)row.ItemArray[6],
                        StartDateTime = (row.ItemArray[7] == DBNull.Value) ? null : (DateTime)row.ItemArray[7],
                        EndDateTime = (row.ItemArray[8] == DBNull.Value) ? null : (DateTime)row.ItemArray[8],
                        RegisteredBy = row.ItemArray[9].ToString(),
                        PLCWorkID = (int)row.ItemArray[10],
                        RegistrationStatus = row.ItemArray[11].ToString(),
                        EquipmentName = row.ItemArray[12].ToString()
                    });

                }
            }
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }

    return Results.Json(ManAdds);
})
.WithName("ManAddReports.GetAll");

app.MapGet("/ManAddReports/getManAdd", (int id, IConfiguration config) =>
{
    var ManAdds = new List<ManAddReport>();
    var cs = config.GetValue<string>("ApiConfiguration:DBConnectionString");
    var query = config.GetValue<string>("ApiConfiguration:ManAddReports.getManAdd");
    if (query == null)
        query = "SELECT reg.Id as Id, reg.PhaseName as PhaseName, reg.MaterialName as MaterialName, reg.TargetAmount as TargetAmount, reg.ActualAmount as TotalQuantity, reg.StartDateTime as RegStartDateTime, reg.EndDateTime as RegEndDateTime, reg.EquipmentName as EquipmentName, lots.id as Lot_Id, lots.LotId as Lot_LotId, lots.ActualAmount as Lot_ActualAmount, lots.LastUpdateAt as Lot_RegisteredDateTime, lots.RegisteredBy as Lot_RegisteredBy FROM x_ManAdds_Registration reg INNER JOIN x_ManAdds_LotsRegistration lots ON lots.ManAdds_Registration_Id = reg.Id where reg.Id = @id ORDER BY Lots.LastUpdateAt ASC";
    var cn = new System.Data.SqlClient.SqlConnection(cs);
    try
    {
        cn.Open();
        using (var cmd = new System.Data.SqlClient.SqlCommand(query, cn))
        {
            var da = new System.Data.SqlClient.SqlDataAdapter(cmd);
            var PId = new System.Data.SqlClient.SqlParameter("@id", System.Data.SqlDbType.Int);
            PId.Value = id;
            cmd.Parameters.Add(PId);
            cmd.Prepare();
            var dt = new System.Data.DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                foreach (System.Data.DataRow row in dt.Rows)
                {
                    ManAdds.Add(new ManAddReport
                    {
                        Id = (int)row.ItemArray[0],
                        PhaseName = row.ItemArray[1].ToString(),
                        MaterialName = row.ItemArray[2].ToString(),
                        TargetAmount = (float)row.ItemArray[3],
                        TotalQuantity = (float)row.ItemArray[4],
                        RegStartDateTime = (row.ItemArray[5] == DBNull.Value) ? null : (DateTime)row.ItemArray[5],
                        RegEndDateTime = (row.ItemArray[6] == DBNull.Value) ? null : (DateTime)row.ItemArray[6],
                        EquipmentName = row.ItemArray[7].ToString(),
                        Lot_Id = (int)row.ItemArray[8],
                        Lot_LotId = row.ItemArray[9].ToString(),
                        Lot_ActualAmount = (float)row.ItemArray[10],
                        Lot_RegisteredDateTime = (row.ItemArray[11] == DBNull.Value) ? null : (DateTime)row.ItemArray[11],
                        Lot_RegisteredBy = row.ItemArray[12].ToString(),
                       
                    });

                }
            }
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }

    return Results.Json(ManAdds[0]);
})
.WithName("ManAddReports.GetManAdd");

#endregion

#region Users

app.MapGet("/ManAddUsers/getAll", (IConfiguration config) =>
{
    var Users = new List<ManAddUser>();
    var cs = config.GetValue<string>("ApiConfiguration:DBConnectionString");
    var query = config.GetValue<string>("ApiConfiguration:ManAddUsers.getAll");
    var cn = new System.Data.SqlClient.SqlConnection(cs);
    try
    {
        cn.Open();
        using (var cmd = new System.Data.SqlClient.SqlCommand(query, cn))
        {
            var da = new System.Data.SqlClient.SqlDataAdapter(cmd);
            var dt = new System.Data.DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                foreach (System.Data.DataRow row in dt.Rows)
                {
                    Users.Add(new ManAddUser
                    {
                        Id = (int)row.ItemArray[0],                        
                        UserName = row.ItemArray[1].ToString()                        
                    });
                }
            }
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }

    return Results.Ok(Users.ToArray());
})
.WithName("ManAddUsers.getAll");

#endregion

#region Reception

app.MapPut("/Reception/closeShipment", (IConfiguration config, int shipmentLog_ID) =>
{
    var cs = config.GetValue<string>("ApiConfiguration:DBConnectionString");
    var query = config.GetValue<string>("ApiConfiguration:Reception.closeShipment");
    var cn = new SqlConnection(cs);
    try
    {
        cn.Open();
        using (var cmd = new SqlCommand(query, cn))
        {
            var PRegistrationValue = new SqlParameter("@shipmentLog_ID", SqlDbType.Int);

            PRegistrationValue.Value = shipmentLog_ID;

            cmd.Parameters.Add(PRegistrationValue);

            cmd.Prepare();
            cmd.ExecuteNonQuery();

        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }

    return Results.Ok();

}).WithName("Reception.closeShipment");

#endregion

app.Run();

