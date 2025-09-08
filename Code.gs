const SHEET_NAME = "DATA_IMUNISASI";

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function doGet(e) {
  try {
    const sheet = getSheet();
    const data = sheet.getDataRange().getValues();
    const headers = data.shift();
    const records = data.map(row => {
      let obj = {};
      headers.forEach((h, i) => obj[h] = row[i]);
      return obj;
    });
    return ContentService.createTextOutput(JSON.stringify({status:"success", data:records}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status:"error", message:err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const sheet = getSheet();
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.tglImunisasi,
      data.nikAnak,
      data.namaBayi,
      data.nikIbu,
      data.tglLahir,
      data.umur,
      data.panjangBadan,
      data.beratBadan,
      data.jenisKelamin,
      data.namaOrtu,
      data.kelurahan,
      data.rtrw,
      data.email || "",
      (data.jenisVaksin || []).join(", ")
    ]);
    return ContentService.createTextOutput(JSON.stringify({status:"success", message:"Data berhasil disimpan"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status:"error", message:err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
