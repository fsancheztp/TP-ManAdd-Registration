SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Rafael Ortiz
-- Create date: 2024-11-13
-- Description:	Send Finalize CMD to PLC via OPC Router
-- =============================================
CREATE OR ALTER TRIGGER x_trg_Upd_SendFinalizeCmd 
   ON  x_ManAdds_Registration
   AFTER UPDATE
AS 
BEGIN
	DECLARE   @tagID				int			  = NULL
			, @tagName				nvarchar(100) = NULL
			, @tagAddress			nvarchar(200) = NULL
			, @registrationStatus	nvarchar(20)  = NULL;

	DECLARE @status_complete	nvarchar(20) = NULL;

	SET @status_complete = 'Complete'

	SELECT @registrationStatus = RegistrationStatus FROM inserted

	IF @registrationStatus = @status_complete
	BEGIN

		--Get TagID, TagAddress
		SET @tagName = 'C03C20_ManAdd_Finalize' --Only that Unit is consedered here
		SELECT TOP 1
			  @tagID		= TagID 
			, @tagAddress	= TagAddress
		FROM pp_PlcTagConfig WHERE Name = @tagName

		IF @tagID IS NOT NULL AND @tagAddress IS NOT NULL
		BEGIN
			INSERT INTO pp_PlcWriteRequest
				SELECT @tagAddress, '1', GETDATE()
		END

	END

END
GO
