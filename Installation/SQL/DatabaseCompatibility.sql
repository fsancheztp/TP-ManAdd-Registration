select @@VERSION

SELECT compatibility_level FROM sys.databases WHERE name = 'TPMDB'  

ALTER DATABASE TPMDB
SET COMPATIBILITY_LEVEL = 150