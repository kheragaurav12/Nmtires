import firebase from 'firebase/app';
import { Category } from './category';

export class Tires {
  tireId: string;
  title: string;
  description: string;
  category?: Category;
  imageUrls: string[];
  thumbnailImage: number;
  size: {
    diameter: number;
    width: number;
    rim: number;
  }
  brand: string;
  model: string;
  yearForm: number;
  yearTo: number;
  price: number;
  active?: boolean;
  showOnHomePage: boolean;
  createdOn?: firebase.firestore.Timestamp;
}

/**
 * plant name(scientific)
 *
 * plant des.
 *
 * plant image
 */
