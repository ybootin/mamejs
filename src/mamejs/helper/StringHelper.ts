namespace mamejs.helper {
  export class StringHelper {
    static toUint8Array = (str: string):Uint8Array => {
      var len = str.length;
      var bytes = new Uint8Array( len );
      for (var i = 0; i < len; i++)        {
          bytes[i] = str.charCodeAt(i);
      }
      return bytes;
    }
  }
}
