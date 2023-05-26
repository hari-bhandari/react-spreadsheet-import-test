import uniqBy from "lodash/uniqBy";
export const uniqueEntries = (data, index) => uniqBy(data.map((row) => ({ entry: row[index] })), "entry").filter(({ entry }) => !!entry);
