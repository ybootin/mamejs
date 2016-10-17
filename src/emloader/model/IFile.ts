namespace emloader {
  export interface IFile {
    // Origin of the file
    url: string,
    // filename related to driver (ex : shinobi.zip ==> driver shinobi)
    name: string,
    data: Uint8Array
  }
}


