import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { Review } from '../../types/review';
import { requestBackend } from '../../util/requests';
import './styles.css';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

export const ReviewForm = ({ movieId, onInsertReview }: Props) => {
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

    requestBackend(config)
      .then((response) => {
        setValue('text', '');
        onInsertReview(response.data);
      })
      .catch((error) => {
        console.log('Erro', error);
      });
  };

  return (
    <div className="valuation-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <input
          {...register('text', {
            required: 'Campo Obrigatório',
          })}
          type="text"
          className={`${errors.text ? 'form-control is-invalid' : ''}`}
          placeholder="Deixe sua avaliação aqui"
        />
        <button type="submit">Salvar Avaliação</button>
      </form>
    </div>
  );
};

export default ReviewForm;
