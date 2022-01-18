import React, { FC, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row } from 'react-bootstrap';
import { actions, useDispatch } from '../../store';
import useAPI from '../../hooks/useAPI';

import './Authenticate.scss';

const Authenticate: FC = () => {
  const history = useHistory();
  const { authenticate } = useAPI();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = useMemo(() => {
    return email.length > 0 && password.length > 0;
  }, [email, password]);

  const handleSubmit = () => {
    authenticate({ email, password }).then((user) => {
      dispatch(actions.set({ user }));
      history.push('/transactions');
    });
  };

  return (
    <main className="authenticate">
      <h1>Authenticate</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Row className="row__submit">
          <Button
            variant="primary"
            className="submit"
            disabled={!validateForm}
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </Row>
      </Form>
    </main>
  );
};

export default Authenticate;
