import { Method, request } from '../helper/request.helper';
import { IProduct } from '../interface/Product.interface';

export class ProductAPI {
  static readonly COMPONENT_NAME: string = 'products';

  static fetchAll = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          order: 'createdAt DESC',
          include: [{ relation: 'categories' }],
        },
      },
    });
  };

  static create = (data: IProduct) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data,
    });
  };

  static put = (data: IProduct) => {
    return request({
      method: Method.PUT,
      url: `/${this.COMPONENT_NAME}`,
      data,
    });
  };

  static update = (id: string, data: IProduct) => {
    return request({
      method: Method.PATCH,
      url: `/${this.COMPONENT_NAME}/${id}`,
      data,
    });
  };

  static delete = (id: string) => {
    return request({
      method: Method.DELETE,
      url: `/${this.COMPONENT_NAME}/${id}`,
    });
  };
}
