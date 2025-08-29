export interface GameCardPropsT {
  name: string;
  releaseYear: string | number;
  imgUrl: string;
  rating?: string | number;

  gameId?: string | number;
  comment?: string;
  isCollectionCard?: boolean;
  userRating?: string | number;
  addedGameIds: Set<string | number>;
  fbDocId?: string;
}
