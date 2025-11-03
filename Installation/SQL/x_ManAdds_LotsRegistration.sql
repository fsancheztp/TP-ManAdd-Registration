USE [TPMDB]
GO

/****** Object:  Table [dbo].[x_ManAdds_LotsRegistration]    Script Date: 11/4/2024 2:30:08 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[x_ManAdds_LotsRegistration](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ManAdds_Registration_Id] [int] NULL,
	[ActualAmount] [real] NULL,
	[LastUpdateAt] [datetime] NULL,
	[RegisteredBy] [nvarchar](50) NULL,
	[LotId] [nvarchar](100) NULL
) ON [PRIMARY]
GO


