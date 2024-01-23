import { AxiosRequestConfig } from 'axios';
import ButtonForm from 'Components/ButtonForm';
import { useForm } from 'react-hook-form';
import { Review } from 'types/review';
import { requestBackend } from 'util/requests';
import './styles.css';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config).then((response) => {
      setValue('text', '');
      onInsertReview(response.data);
    });
  };

  return (
    <div className="base-card review-form-card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 review-form-card-input">
          <input
            {...register('text', {
              required: 'Preenchimento de avaliação obrigatório',
            })}
            type="text"
            className={`form-control base-input ${
              errors.text ? 'is-invalid' : ''
            }`}
            placeholder="Deixe sua avaliação aqui"
            name="text"
          />
          <div className="invalid-feedback d-block">{errors.text?.message}</div>
          <div className="submit">
            <ButtonForm text="SALVAR AVALIAÇÃO" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
