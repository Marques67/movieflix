import { ReactComponent as StarImage } from '../../assets/images/image3.svg';
import { Review } from '../../types/review';
import './styles.css';

type Props = {
  reviews: Review[];
};

const MovieReviews = ({ reviews }: Props) => {
  return (
    <>
      {reviews.map((review, index) => {
        return (
          <div className="assessments-container" key={index}>
            <div className="name-container">
              <StarImage></StarImage>
              <h3>{review.user.name}</h3>
            </div>
            <div className="comment">
              <div className="comment-container">
                <p>{review.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MovieReviews;
