function renderURLFile(path?: string) {
    if (!path) return;

    return process.env.EXPO_PUBLIC_GET_FILE_BASE_URL + "/download?path=" + encodeURIComponent(path!)
}

const uriToFile = async (uri: string, fileName?: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  return new File(
    [blob],
    fileName ?? `image-${Date.now()}.jpg`,
    { type: blob.type || 'image/jpeg' }
  );
};


export {
  renderURLFile,
  uriToFile
};

