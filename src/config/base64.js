const fs = require("fs")
const path = require("path")

// Convert a file to Base64 encoding
const fileToBase64 = (filePath) => {
  const fileData = fs.readFileSync(filePath)
  return fileData.toString("base64")
}

// Save Base64 data to a file
const base64ToFile = (base64Data, outputPath) => {
  const buffer = Buffer.from(base64Data, "base64")
  fs.writeFileSync(outputPath, buffer)
}

// Convert Base64 data to a file and return the file path
const base64ToImage = (base64Data, outputDir, fileNamePrefix = "image") => {
  const fileName = `${fileNamePrefix}_${Date.now()}.png`
  const outputPath = path.join(outputDir, fileName)
  base64ToFile(base64Data, outputPath)
  return outputPath
}

module.exports = { fileToBase64, base64ToFile, base64ToImage }
