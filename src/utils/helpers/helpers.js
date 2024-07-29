export const formatDate = (date) => {
  if (!date) {
    return "";
  }

  const newDate = new Date();

  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};

export const getJoinTableQuery = (mainTable, options) => {
  let mainTableColumns = Object.keys(mainTable.getAttributes()).filter(
    (mc) => mc !== "id"
  );
  const mainTableName = mainTable.getTableName();
  const mainTableQNAme = mainTableName.slice(0, -1);

  // Generate JSON object construction and join queries for reference tables
  const includesQuery = options.include.map((refTable) => {
    const refTableColumns = Object.keys(refTable.table.getAttributes()).filter(
      (t) => t !== "id"
    );
    const refTableName = refTable.table.getTableName();
    const refTableQName = refTableName.slice(0, -1); // Remove trailing 's'

    return {
      jsonQuery: `
    json_build_object(
      'id', ${refTableQName}."id",
      ${refTableColumns
        .map((c) => `'${c}', ${refTableQName}."${c}"`)
        .join(", ")}
    ) AS "${refTableQName}"
  `,
      joinQuery: `JOIN "${refTableName}" AS ${refTableQName} ON ${mainTableQNAme}."${refTable.foreignKey}" = ${refTableQName}."id"`,
    };
  });

  // Select columns from the main table

  // Construct the final SQL query
  const query = `
SELECT
  ${mainTableQNAme}."id",
  ${mainTableColumns.map((c) => `${mainTableQNAme}."${c}"`).join(", ")},
  ${includesQuery.map((iq) => iq.jsonQuery).join(", ")}
FROM
  "${mainTableName}" AS ${mainTableQNAme}
  ${includesQuery.map((iq) => iq.joinQuery).join(" ")}
${
  options?.where
    ? `WHERE ${mainTableQNAme}."${options.where[0]}" ${options.where[1]} '${options.where[2]}'`
    : ""
}
`;

  // Execute the query and return the result
  return query;
};

export const getReferencedData = async (tableName, foreignKey, ids) => {
  const query = `SELECT * FROM ${tableName} WHERE ${foreignKey} = ANY($1)`;
  const result = await pool.query(query, [ids]);
  return result.rows;
};
