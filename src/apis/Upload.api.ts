import { Method, request } from '../helper/request.helper';

export class UploadAPI {
  static readonly COMPONENT_NAME: string = 'files';

  static upload = (file: File) => {
    const data = new FormData();
    data.append('file', file);
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
  };

  static uploadMulti = (files: File[]) => {
    const data = new FormData();
    files.forEach((file, index) => {
      data.append(`file-${index}`, file, file.name);
    });
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
  };
}
