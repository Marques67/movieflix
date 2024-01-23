import './styles.css';

type Props = {
  text: string;
};

const ButtonForm = ({ text }: Props) => {
  return (
    <>
      <div className="button-details">
        <button className="btn btn-secundary button-form">
          <h6>{text}</h6>
        </button>
      </div>
    </>
  );
};

export default ButtonForm;
