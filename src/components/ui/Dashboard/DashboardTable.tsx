import React from "react";
import styles from "./DashboardTable.module.scss";
import {
  IDashboardTable,
  IDashboardTableBaseData,
} from "./dashboard-table.types";
import { DashboardTableActions } from "./DashboardTableActions";

export const DashboardTable = <
  TData extends IDashboardTableBaseData,
>({
  columns,
  data,
  headerActions,
}: IDashboardTable<TData>) => {
  return (
    <div className={styles.body_table_admin}>
      <table className={styles.table_admin}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.title}>{column.title}</th>
            ))}
            {headerActions.map((column) => (
              <th key={column} className={styles.minWidth}>
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length ? (
            data.map((record, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {columns.map((column) => {
                    return (
                      <td
                        key={column.dataIndex.toString() + rowIndex}
                      >
                        {column.render(record, rowIndex)}
                      </td>
                    );
                  })}
                  <DashboardTableActions<TData> baseRecord={record} />
                </tr>
              );
            })
          ) : (
            <tr className={styles.trNotFound}>
              <td className={styles.tdNotFound}>Not found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
