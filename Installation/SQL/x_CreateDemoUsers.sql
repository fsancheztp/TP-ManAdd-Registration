DECLARE   @GroupName as NVARCHAR(50)
		, @GroupID as int
		, @NewUserID as int

/*!!!!!Modify the group name*/
SET @GroupName = 'Registro ManAdds'

IF NOT EXISTS (SELECT * FROM UserGroup WHERE Name like @GroupName)
BEGIN
	INSERT INTO UserGroup
	  SELECT @GroupName, GETDATE(), 'System'

	SET @GroupID = SCOPE_IDENTITY();
END
ELSE
BEGIN
	SET @GroupID = (SELECT ID FROM UserGroup WHERE Name = @GroupName)
END

SELECT @GroupID = ID FROM UserGroup WHERE Name = @GroupName

--Add new Users
DECLARE   @TestUser as nvarchar(50)
		, @NumUsers as int = 5
		, @Counter as int = 1

/*!!!!!Modify the user name*/
SET @TestUser = 'Usuario Demo ';

WHILE @Counter <= @NumUsers
BEGIN
	IF NOT EXISTS (SELECT * FROM Users WHERE Name LIKE CONCAT(@TestUser, @Counter))
	BEGIN
		INSERT INTO Users VALUES
		(1 + (SELECT TOP 1 PLC_ID FROM Users ORDER BY PLC_ID DESC), CONCAT(@TestUser, @Counter)	, '1', 'nopassword', GETDATE(), 'System', NULL, NULL)
	
		SET @NewUserID = SCOPE_IDENTITY()

		--Relate New User to UserGroup
		INSERT INTO User_UserGroup
		SELECT
			  @NewUserID
			, @GroupID
			, GETDATE()
			, 'System'
	END
	SET @Counter = @Counter + 1
END


