import { ColumnType } from "../MatchColumnsStep";
export const setIgnoreColumn = ({ header, index }) => ({
    header,
    index,
    type: ColumnType.ignored,
});
