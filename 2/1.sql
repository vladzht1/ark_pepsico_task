DECLARE @CurrentRequestId integer;
DECLARE @MinTotalPrice integer;

SET @CurrentRequestId = 111;
SET @MinTotalPrice = 100000;

SELECT t.CatalogID, (t.PositionQuantity * t.PositionPrice) as TotalPrice FROM dbo.Table1 as t
WHERE t.RequestID = @CurrentRequestId AND (t.PositionQuantity * t.PositionPrice) > @MinTotalPrice
GROUP BY t.CatalogID;
