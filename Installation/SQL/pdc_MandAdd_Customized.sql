
GO
/****** Object:  StoredProcedure [dbo].[pdc_ManAdd_Customized]    Script Date: 11/3/2025 1:19:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
ALTER   PROCEDURE [dbo].[pdc_ManAdd_Customized]
 
/********************************************************************************************************************************************************/
/****** Object: Stored Procedure dbo.pdc_ManAdd_Customized ******************************************************************************************/
-- -------------------------------------------------------------------------------------------------------------------------------------------------------
-- Object		Stored Procedure pdc_ManAdd_Customized
--
--				Copyright Tetra Pak 2002 - 2013. All rights reserved.
-- -------------------------------------------------------------------------------------------------------------------------------------------------------
-- Author		Olof Ståhl
-- Created		2007-01-01
-- Description	If ManAdd Running add a new entry in x_ManAdd_Registration table
--				If ManAdd Completed in C03C20 set entry to complete in x_ManAdd_Registration table
-- -------------------------------------------------------------------------------------------------------------------------------------------------------
-- Guidelines	Error handling must be created from beginning - use error codes between 100000 and 900000
-- -------------------------------------------------------------------------------------------------------------------------------------------------------
-- History
--	[Version]	[Name]				[Date]		[Comments]
--	1.00		RORTIZ			2024-11-14		First draft
-- -------------------------------------------------------------------------------------------------------------------------------------------------------
 
	@DateTimeStamp								AS DateTime,		--
 
	@LogType									AS Int,				-- Integer 0 - LogType - Defines the type of message to be evaluated
	@Integer1									AS Int,				-- Integer 1
	@PhaseID									AS Int,				-- Integer 2 - The ID for the phase within the PLC
	@PhaseStatusID								AS Int,				-- Integer 3 - The ID for the phase status within the PLC
	@PhaseInstanceCounter						AS Int,				-- Integer 4 - The counter used to secure which operations that are related to each other
	@OperatedByID								AS Int,				-- Integer 5 - The ID for the operator within the PLC
	@EventInfoCauseID							AS Int,				-- Integer 6 - The ID for the error info cause within the PLC
	@Integer7									AS Int,				-- Integer 7
	@Integer8									AS Int,				-- Integer 8
	@Integer9									AS Int,				-- Integer 9
	@Integer10									AS Int,				-- Integer 10
	@PLC_DestWorkID								AS Int,				-- Integer 11
	@MaterialID									AS Int,				-- Integer 12 - The ID for the material within the PLC
	@Integer13									AS Int,				-- Integer 13
	@LotIDInt									AS Int,				-- Integer 14
	@Integer15									AS Int,				-- Integer 15
	@Integer16									AS Int,				-- Integer 16
	@Integer17									AS Int,				-- Integer 17
	@Integer18									AS Int,				-- Integer 18
	@Integer19									AS Int,				-- Integer 19
 
	@TargetAmount								AS Real,			-- Real 0
	@ActualAmount								AS Real,			-- Real 1
	@LotIDAmount								AS Real,			-- Real 2
	@Real3										AS Real,			-- Real 3
	@Real4										AS Real,			-- Real 4
 
	@LotIDString								AS nVarchar(30),	-- String 0
	@EngUnit									AS nVarchar(10)		-- String 1
 
AS
 
SET NOCOUNT ON
 
-- -------------------------------------------------------------------------------------------------------------------------------------------------------
	/* Place your code here */
	--13200030
--IF @PhaseID = (SELECT PLC_ID FROM Phase WHERE Name = 'C03C20_ManAdd')
--BEGIN
	IF @PhaseStatusID = 1024 --Running
	BEGIN
		--Add a new entry in x_ManAdd_Registration	
		IF ISNULL(@MaterialID, 0) = 0
		BEGIN
			SELECT TOP 1 @MaterialID = PLC_ID FROM Material WHERE Name LIKE 'Mix 1'
		END
 
		IF ISNULL(@TargetAmount, 0) =  0
			SET @TargetAmount = 387.5
 
		INSERT INTO x_ManAdds_Registration
			SELECT
				  p.PLC_ID
				, p.Name
				, @MaterialID
				, (SELECT Name FROM Material WHERE PLC_ID = @MaterialID)
				, @TargetAmount
				, @ActualAmount
				, dbo.TpmUtcToLocal(@DateTimeStamp)
				, NULL
				, ISNULL((SELECT Name FROM Users WHERE PLC_ID = @OperatedByID), 'Unknown')
				, @PLC_DestWorkID
				, 'Running'
				, LEFT(@PhaseID,LEN('C03C20'))
			FROM Phase p
			WHERE p.PLC_ID = @PhaseID
	END
	ELSE IF @PhaseStatusID = 2048 --Complete
	BEGIN
 
		DECLARE @manAdd_regID	int = NULL
 
		SELECT
			@manAdd_regID = Id
		FROM x_ManAdds_Registration
		WHERE PLCWorkID = @PLC_DestWorkID
		AND RegistrationStatus = 'Running'
 
		EXEC x_I_CustomLogs '[pdc_ManAdd_Customized]','Reg Complete', @PLC_DestWorkID
 
		UPDATE x_ManAdds_Registration
			SET RegistrationStatus = 'Complete', EndDateTime = GETDATE()
		WHERE id = @manAdd_regID
	END
--END
 
 
	/* End */
 
SET NOCOUNT OFF