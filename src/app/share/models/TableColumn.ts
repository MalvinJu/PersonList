export interface TableColumn {
    Title: string,
    Column: string,
    ColumnType: 'text' | 'number' | 'age',
    visible: boolean,
    IsMainTitle: boolean
}