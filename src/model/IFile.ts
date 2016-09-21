namespace mamejs {
  export interface IFile {
    // Origin of the file
    url: string,
    // filename (ex : shinobi.zip)
    name: string,
    data: Uint8Array
  }
}


