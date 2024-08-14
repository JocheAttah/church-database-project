function formatFileSize(bytes: number = 0) {
  const kb = 1024;
  const mb = kb * 1024;

  if (bytes >= mb) {
    return (bytes / mb).toFixed(2) + " MB";
  } else if (bytes >= kb) {
    return (bytes / kb).toFixed(2) + " KB";
  } else {
    return bytes + " bytes";
  }
}

export { formatFileSize };
