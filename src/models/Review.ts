export interface IReview {
  id: number;
}

export interface ICreateReviewInput {
  comment: string;
  vote: number;
  userId: number;
  movieId?: number;
  seriesId?: number;
  animationId?: number;
}
