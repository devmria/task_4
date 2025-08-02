import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthService } from 'services/AuthService';
import { useAuth } from 'context/AuthContext';
import { Button, Input } from '@mui/material';

type FormData = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValues: FormData = {
    email: '',
    password: '',
  };

  const handleLogin = async (values: FormData) => {
    try {
      const data = await AuthService.login(values.email, values.password);
      setUser(data.user);
      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Login failed');
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="col-md-12">
      <div className="flex flex-col gap-m items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-m w-300">
              <h1>Login</h1>
              <span>test@example.com </span> 
              <span>password123 </span>
              <span>test_01@example.com </span>
              <span>password123_01 </span>
              <div className="flex flex-col gap-xs">
                <Field name="email">
                  {({ field, meta }: any) => (
                    <div className="flex flex-col gap-xxs">
                      <Input
                        {...field}
                        type="email"
                        placeholder="E-mail"
                        error={meta.touched && meta.error}
                      />
                      <div className="text-error text-xs">
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                  )}
                </Field>

                <Field name="password">
                  {({ field, meta }: any) => (
                    <div className="flex flex-col gap-xxs">
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        error={meta.touched && meta.error}
                      />
                      <div className="text-error text-xs">
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                  )}
                </Field>
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <span>Logging in...</span> : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="flex flex-row gap-xs items-center mt-4">
          <span>Don't have an account?</span>
          <Link to="/register" className="nav-link">
            <span className="text-base">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
