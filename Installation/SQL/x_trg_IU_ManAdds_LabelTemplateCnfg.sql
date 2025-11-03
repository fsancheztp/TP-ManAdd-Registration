
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Rafael Ortiz
-- Create date: 2024-12-11
-- Description:	Updated table
-- =============================================
CREATE TRIGGER x_trg_IU_ManAdds_LabelTemplateCnfg 
   ON  x_ManAdds_LabelTemplateCnfg
   AFTER INSERT,UPDATE
AS 
BEGIN
	SET NOCOUNT ON;

    UPDATE x_ManAdds_LabelTemplateCnfg
	SET LastUpdateAt = GETDATE()
		, UpdatedBy = '[x_trg_IU_ManAdds_LabelTemplateCnfg]'
	WHERE Id = (SELECT Id FROM inserted)

END
GO
