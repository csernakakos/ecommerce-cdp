import colors from "colors";

export default function logToConsole(string) {
    process.env.NODE_ENV === "development" ? console.log(string.black.bgWhite) : null;
}