import DatabaseTable from './DatabaseTable.js'

export default {

  /**
   * Get table.
   * 
   * @param {string} tableName 
   * @returns {DatabaseTable}
   */
  getTable(tableName) {
    return DatabaseTable.getInstance(tableName);
  },

}
