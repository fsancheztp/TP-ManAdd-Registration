USE [TPMDB]
GO

/****** Object:  Table [dbo].[x_ManAdds_Registration]    Script Date: 11/4/2024 2:28:24 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[x_ManAdds_Registration](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PhaseID] [int] NULL,
	[PhaseName] [nvarchar](50) NULL,
	[MaterialID] [int] NULL,
	[MaterialName] [nvarchar](50) NULL,
	[TargetAmount] [real] NULL,
	[ActualAmount] [real] NULL,
	[StartDateTime] [datetime] NULL,
	[EndDateTime] [datetime] NULL,
	[RegisteredBy] [nvarchar](50) NULL,
	[PLCWorkID] [int] NULL,
	[RegistrationStatus] [nvarchar](20) NULL,
	[EquipmentName] [nvarchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


