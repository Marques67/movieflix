import StarImg from 'assets/images/star.png';
import { Review } from 'types/review';

import './styles.css';

type Props = {
  reviews: Review[];
};

const ReviewCard = ({ reviews }: Props) => {
  return (
    <div className="base-card review-card">
      {reviews?.map((review) => (
        <div key={review.id}>
          <h1>
            {' '}
            <img src={StarImg} alt="" />
            {review.user.name}
          </h1>
          <div className="review-card-top-container" key={review.id}>
            <p>{review.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;
