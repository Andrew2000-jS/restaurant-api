export class CommonQueries {
  static insert(
    tableName: string,
    tableColumns: string[],
    values: any[]
  ): string {
    const placeholders = values.map((_, index) => `$${index + 1}`).join(',')
    const query = `INSERT INTO ${tableName} (${tableColumns.join(',')}) VALUES (${placeholders})`
    return query
  }

  static findAll(tableName: string): string {
    const query = `SELECT * FROM ${tableName}`
    return query
  }

  static delete(tableName: string, where: string): string {
    const query = `DELETE FROM ${tableName} WHERE ${where}=$1`

    return query
  }

  static findById(tableName: string): string {
    const query = `SELECT * FROM ${tableName} WHERE id=$1`
    return query
  }
}
