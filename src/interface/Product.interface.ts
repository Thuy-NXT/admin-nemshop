import { IBase } from './Base.interface';
import { ICategory } from './Category.interface';

export interface IProduct extends IBase {
  name?: string;
  image?: string[];
  descaption?: string;
  price?: number;
  size?: string[];
  path?: string;
  categoriesId?: string;
  collectionId?: string;
  categories?: ICategory;
}
