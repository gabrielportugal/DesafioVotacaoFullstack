import React from 'react';
import { theme } from '../../theme';

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
}

export function Table<T>({ columns, data, keyExtractor, emptyMessage = 'Nenhum registro encontrado' }: TableProps<T>) {
  const tableStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    boxShadow: theme.shadows.sm,
  };

  const tableInnerStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const theadStyle: React.CSSProperties = {
    backgroundColor: theme.colors.primary,
  };

  const thStyle: React.CSSProperties = {
    padding: theme.spacing.md,
    textAlign: 'left',
    color: theme.colors.white,
    fontWeight: 600,
    fontSize: '0.875rem',
    borderBottom: `2px solid ${theme.colors.secondary}`,
  };

  const tbodyStyle: React.CSSProperties = {
    backgroundColor: theme.colors.background.card,
  };

  const tdStyle: React.CSSProperties = {
    padding: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.tertiary}`,
    fontSize: '0.875rem',
    color: theme.colors.text.primary,
  };

  const emptyStyle: React.CSSProperties = {
    padding: theme.spacing.xxl,
    textAlign: 'center',
    color: theme.colors.text.secondary,
    fontSize: '0.875rem',
  };

  if (data.length === 0) {
    return (
      <div style={tableStyle}>
        <div style={emptyStyle}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div style={tableStyle}>
      <table style={tableInnerStyle}>
        <thead style={theadStyle}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  ...thStyle,
                  width: column.width,
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={tbodyStyle}>
          {data.map((item) => (
            <tr key={keyExtractor(item)}>
              {columns.map((column) => (
                <td key={column.key} style={tdStyle}>
                  {column.render ? column.render(item) : (item as any)[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
