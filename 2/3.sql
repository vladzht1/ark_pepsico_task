DECLARE @dt_start datetime;
DECLARE @req_type_id integer;

SET @dt_start = '20230901';
SET @req_type_id = 3578;

DECLARE @Apps TABLE (AppID int primary key clustered, FromAppID int);

INSERT @Apps (ReqID, ParentRequestID)
SELECT App.ID, AF.ParentRequestID
FROM Request App
LEFT JOIN Request AF ON App.ParentRequestID = AF.ReqID
WHERE App.CDate >= @dt_start AND App.ReqTypeID IN (@req_type_id);

WITH CTE AS (
    SELECT App.ID AS ReqID, App.ParentRequestID, App.CDate
    FROM Request App
    WHERE App.ReqTypeID = @req_type_id AND App.CDate >= @dt_start
    UNION ALL
    SELECT Parent.ID AS ReqID, Parent.ParentRequestID, Parent.CDate
    FROM Request Parent
    INNER JOIN CTE req ON Parent.ReqID = req.ParentRequestID
    WHERE Parent.CDate < @dt_start
)

-- Добавляем в @Apps после исполнения рекурсии (через вложенный запрос следим, чтобы не было дублирования)
INSERT INTO @Apps (ReqID, ParentRequestID)
SELECT ReqID, ParentRequestID FROM CTE
WHERE ReqID NOT IN (
    SELECT ReqID FROM @Apps
)
OPTION(MAXRECURSION 20);
