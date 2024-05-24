const { render, useState } = wp.element;
import { Field } from 'shared';

const Votes = () => {
  const [votes, setVotes] = useState(0);
  const addVote = () => {
    setVotes(votes + 1);
  };
  return (
    <div>
      <Field 
        field={
          {
            field_type: 'text',
            field_name: 'test_field_1',
            placeholder: 'Test field 1...'
          }  
        }
      />
      <h2>{votes} Votes</h2>
      <p>
        <button onClick={addVote}>Vote!</button>
      </p>
    </div>
  );
};

render(<Votes />, document.getElementById(`react-app`));