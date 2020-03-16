export class Upload {

    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();
    // tslint:disable-next-line: no-misused-new
    constructor(file: File) {
      this.file = file;
    }
  }