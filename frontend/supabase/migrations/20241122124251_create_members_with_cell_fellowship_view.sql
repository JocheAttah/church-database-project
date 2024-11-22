CREATE VIEW members_with_cell_fellowship AS
SELECT
  m.*,
  concat(cf.name, ' ', cf.type) as cell_fellowship
FROM members m
LEFT JOIN cell_fellowship cf ON m.cell_fellowship_id = cf.id;
