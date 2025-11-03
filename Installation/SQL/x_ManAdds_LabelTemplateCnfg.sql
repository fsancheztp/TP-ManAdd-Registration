USE [TPMDB]
GO

/****** Object:  Table [dbo].[x_ManAdds_LabelTemplateCnfg]    Script Date: 12/12/2024 7:13:54 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[x_ManAdds_LabelTemplateCnfg](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TemplateName] [nvarchar](50) NOT NULL,
	[BarCode1] [nvarchar](2000) NULL,
	[BarCode2] [nvarchar](2000) NULL,
	[BarCode3] [nvarchar](2000) NULL,
	[LotId] [nvarchar](2000) NULL,
	[ExpirationDate] [nvarchar](2000) NULL,
	[Quantity] [nvarchar](2000) NULL,
	[Par1] [nvarchar](2000) NULL,
	[Par2] [nvarchar](2000) NULL,
	[Par3] [nvarchar](2000) NULL,
	[Par4] [nvarchar](2000) NULL,
	[Par5] [nvarchar](2000) NULL,
	[Par6] [nvarchar](2000) NULL,
	[Par7] [nvarchar](2000) NULL,
	[Par8] [nvarchar](2000) NULL,
	[Par9] [nvarchar](2000) NULL,
	[Par10] [nvarchar](2000) NULL,
	[LastUpdateAt] [datetime] NULL,
	[UpdatedBy] [nvarchar](100) NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


