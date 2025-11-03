  DECLARE	  @tagName NVARCHAR(30)
			, @tagAddress NVARCHAR(100)

SET @tagName = 'C03C20_ManAdd_Finalize'
SET @tagAddress = 'ns=4;s=PLC2.PLC2.C03C20.ManAdd_C.Finalize'
  
  INSERT INTO pp_PlcTagConfig VALUES
	(@tagName, @tagAddress, NULL, NULL, NULL, NULL, NULL, NULL, getdate(), 'Tetra Pak')