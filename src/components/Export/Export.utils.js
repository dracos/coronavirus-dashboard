import type {DownloadAsCSVInterface} from "./Export.types";

/**
 * Determines the type of an object.
 *
 * @param obj {any} The object whose type is to be defined.
 * @returns {string} Type of the object.
 */
export const objectType = (obj: any): string => {
    switch (obj) {
        case null:
            return "null";
        case undefined:
            return "undefined";
        default:
            switch (obj.constructor) {
                case "test".constructor:
                    return "string";
                case [].constructor:
                    return "array";
                case ({}).constructor:
                    return "object";
                case (0).constructor:
                    return "number";
                case false.constructor:
                    return "boolean";
                default:
                    return "unknown"
            }
    }
}; // objectType


/**
 * Converts a 1D (row) or 2D (table) array into CSV.
 *
 * @param arr {Array} The (nested) array to be converted into CSV.
 * @param row {boolean} ``true`` when processing a single line - a 1D array;
 *                      otherwise ``false`` (default).
 * @returns {string} CSV of the array.
 */
export const array2CsvLine = (arr: Array<any>, row: boolean=false): string => {

    let results = [];

    for ( const item of arr ) {

        switch ( objectType(item) ) {
            case "array":
                results.push(array2CsvLine(item, true));
                break;
            case "string":
                results.push(`"${item.replace('"', '\\"')}"`);
                break;
            case "null":
                results.push("");
                break;
            default:
                results.push(`${item}`.replace('"', '\\"'))

        }

    }

    return results.join(row ? "," : "\n");

}; // array2CsvLine


/**
 * Constructs CSV from a 2D array and triggers a download.
 *
 * @param csv {Array} 2D array (table) of values..
 * @param headings {Array} 1D array of headings.
 * @param fileName {string} Name of the file to be downloaded.
 * @returns {null}
 */
export const downloadAsCSV = ({csv, headings=[], fileName}: DownloadAsCSVInterface): null => {

    const
        csvBlobHeader = { type: "text/csv;charset=utf-8" },
        blob = new Blob([array2CsvLine([headings, ...csv])], csvBlobHeader),
        a = document.createElement("a"),
        url = window.URL.createObjectURL(blob),
        clickHandler = function () {
            setTimeout(() => {
                URL.revokeObjectURL(url);
                this.removeEventListener('click', clickHandler);
                a.remove();
            }, 150)
        };

    a.style = "display: none";
    document.body.appendChild(a);
    a.addEventListener('click', clickHandler, false);
    a.href = url;
    a.download = fileName.toLowerCase().endsWith(".csv")
        ? fileName
        : `${fileName}.csv`;
    a.click();

}; // downloadCSV
