CREATE OR ALTER FUNCTION  x_fn_SU_ManAdd_Get (
	  @rawValue			NVARCHAR(2000)
	, @BarCode1			NVARCHAR(2000)
	, @BarCode2			NVARCHAR(2000)
	, @BarCode3			NVARCHAR(2000)
)

RETURNS @ParsedTable TABLE
(value NVARCHAR(2000))
AS
BEGIN

		DECLARE
		  @util_barCode			int
		, @util_scapeChar		NVARCHAR(10)
		, @util_numChars		int
		, @util_isLastField		int
		, @BarCode				NVARCHAR(2000) = NULL
		, @Value_out			NVARCHAR(2000)
		
	--a<BarCode>|b<ScapeChar>|c<NumChars>|d<isLastField>
	--a2|b(10)|c8|d1

    ;WITH T AS (
		SELECT ROW_NUMBER() OVER(ORDER BY value asc) as "RowNum", value
		FROM STRING_SPLIT(@rawValue,'|')
	)
	SELECT @util_barCode = CAST(SUBSTRING(value, 2, LEN(value)) AS INT)
	FROM T
	WHERE RowNum = 1

	;WITH T AS (
		SELECT ROW_NUMBER() OVER(ORDER BY value asc) as "RowNum", value
		FROM STRING_SPLIT(@rawValue,'|')
	)
	SELECT @util_scapeChar = SUBSTRING(value, 2, LEN(value))
	FROM T
	WHERE RowNum = 2

	;WITH T AS (
		SELECT ROW_NUMBER() OVER(ORDER BY value asc) as "RowNum", value
		FROM STRING_SPLIT(@rawValue,'|')
	)
	SELECT @util_numChars = CAST(SUBSTRING(value, 2, LEN(value)) AS INT)
	FROM T
	WHERE RowNum = 3

		;WITH T AS (
		SELECT ROW_NUMBER() OVER(ORDER BY value asc) as "RowNum", value
		FROM STRING_SPLIT(@rawValue,'|')
	)
	SELECT @util_isLastField = CAST(SUBSTRING(value, 2, LEN(value)) AS INT)
	FROM T
	WHERE RowNum = 4

	IF @util_barCode = 1		SET @BarCode = @BarCode1
	ELSE IF @util_barCode = 2	SET @BarCode = @BarCode2
	ELSE IF @util_barCode = 3	SET @BarCode = @BarCode3

	IF CHARINDEX(@util_scapeChar, @BarCode) > 0
		SET @Value_out = SUBSTRING(@BarCode, CHARINDEX(@util_scapeChar, @BarCode) + LEN(@util_scapeChar), @util_numChars)
	ELSE 
		SET @Value_out = NULL

	INSERT INTO @ParsedTable
		SELECT @Value_out

	RETURN
END
GO