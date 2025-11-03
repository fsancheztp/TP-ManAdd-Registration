USE [TPMDB]
GO
SET IDENTITY_INSERT [dbo].[x_ManAdds_LabelTemplateCnfg] ON 
GO
INSERT [dbo].[x_ManAdds_LabelTemplateCnfg] ([Id], [TemplateName], [BarCode1], [BarCode2], [BarCode3], [LotId], [ExpirationDate], [Quantity], [Par1], [Par2], [Par3], [Par4], [Par5], [Par6], [Par7], [Par8], [Par9], [Par10], [LastUpdateAt], [UpdatedBy], [IsActive]) VALUES (1, N'Etiqueta Provisiones', N'(02)1111111111111(15)280825(37)625', N'(10)24185741', NULL, N'a2|b(10)|c8|d1', N'a1|b(15)|c6|d0', N'a1|b(37)|c3|d1', N'a1|b(02)|c13|d0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2024-12-12T07:12:34.120' AS DateTime), N'[x_trg_IU_ManAdds_LabelTemplateCnfg]', 1)
GO
INSERT [dbo].[x_ManAdds_LabelTemplateCnfg] ([Id], [TemplateName], [BarCode1], [BarCode2], [BarCode3], [LotId], [ExpirationDate], [Quantity], [Par1], [Par2], [Par3], [Par4], [Par5], [Par6], [Par7], [Par8], [Par9], [Par10], [LastUpdateAt], [UpdatedBy], [IsActive]) VALUES (3, N'Etiqueta Pruebas 1', N'00341234567890096500:0085250525', NULL, NULL, N'a1|b0034|c9|d0', N'a1|b:0085|c6|d1', N'a1|b0096|c3|d0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2024-12-12T07:12:38.333' AS DateTime), N'[x_trg_IU_ManAdds_LabelTemplateCnfg]', 1)
GO
SET IDENTITY_INSERT [dbo].[x_ManAdds_LabelTemplateCnfg] OFF
GO
