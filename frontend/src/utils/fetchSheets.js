// src/utils/fetchSheets.js
// Utilities to fetch Google Sheets CSV (public "Anyone with link - Viewer") and parse CSV into JS objects.
// Works with URLs like:
// https://docs.google.com/spreadsheets/d/FILE_ID/edit?gid=GID&usp=sharing
// or without gid (will default to gid=0).

/**
 * Extract fileId and gid from a Google Sheets URL.
 * Returns { fileId, gid } or null
 */
export function parseGoogleSheetUrl(url) {
  try {
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    const gidMatch = url.match(/[&?]gid=([0-9]+)/) || url.match(/#gid=([0-9]+)/);
    if (!fileIdMatch) return null;
    return {
      fileId: fileIdMatch[1],
      gid: gidMatch ? gidMatch[1] : "0",
    };
  } catch (e) {
    return null;
  }
}

/**
 * Build a CSV export URL for Google Sheets
 */
export function buildCsvExportUrl(fileId, gid = "0") {
  return `https://docs.google.com/spreadsheets/d/${fileId}/export?format=csv&gid=${gid}`;
}

/**
 * Very small CSV parser that handles quoted fields and newlines inside quotes.
 * Returns array of rows (arrays of cells).
 */
function parseCSVtoRows(text) {
  const rows = [];
  let cur = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const nxt = text[i + 1];

    if (ch === '"' ) {
      if (inQuotes && nxt === '"') {
        // escaped quote
        cur += '"';
        i++; // skip next
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === "," && !inQuotes) {
      row.push(cur);
      cur = "";
      continue;
    }

    if ((ch === "\n" || ch === "\r") && !inQuotes) {
      // handle CRLF
      if (ch === "\r" && nxt === "\n") {
        i++; // skip \n in CRLF
      }
      row.push(cur);
      rows.push(row);
      row = [];
      cur = "";
      continue;
    }

    cur += ch;
  }

  // final push if anything left
  if (cur !== "" || row.length > 0) {
    row.push(cur);
    rows.push(row);
  }

  return rows;
}

/**
 * Convert CSV text to array of objects using first row as header.
 */
export function csvToObjects(text) {
  const rows = parseCSVtoRows(text);
  if (rows.length === 0) return [];
  const headers = rows[0].map(h => (h || "").trim());
  const objects = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    // skip empty rows (all cells empty)
    if (r.join("").trim() === "") continue;
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      const key = headers[j] || `col${j}`;
      obj[key] = (r[j] || "").trim();
    }
    objects.push(obj);
  }
  return objects;
}

/**
 * Fetch a single Google Sheet CSV and return parsed objects.
 * url: the Google Sheets browser URL (sharing link). Example:
 * https://docs.google.com/spreadsheets/d/FILE_ID/edit?usp=sharing&gid=0
 */
export async function fetchSheetAsObjects(url) {
  const meta = parseGoogleSheetUrl(url);
  if (!meta) throw new Error("Invalid Google Sheet URL: " + url);
  const csvUrl = buildCsvExportUrl(meta.fileId, meta.gid);
  const res = await fetch(csvUrl);
  if (!res.ok) throw new Error("Failed to fetch sheet CSV: " + res.status);
  const text = await res.text();
  const data = csvToObjects(text);
  return data;
}

/**
 * Fetch multiple sheet URLs and merge them into single array.
 * Dedupe by ID field (if provided) or by English Name + Scientific Name.
 * Usage: const all = await fetchAndMergeSheets([url1, url2]);
 */
export async function fetchAndMergeSheets(urls = []) {
  const allRows = [];
  for (const url of urls) {
    try {
      const rows = await fetchSheetAsObjects(url);
      if (Array.isArray(rows)) allRows.push(...rows);
    } catch (e) {
      console.error("fetchAndMergeSheets error for", url, e);
    }
  }

  // dedupe: prefer 'ID' column if present else use name/scientific combo
  const seen = new Map();
  for (const r of allRows) {
    const id = (r["ID"] || "").trim();
    const key = id || ((r["English Name"] || "").toLowerCase().trim() + "||" + (r["Scientific Name"] || "").toLowerCase().trim());
    if (!seen.has(key)) seen.set(key, r);
  }
  return Array.from(seen.values());
}
