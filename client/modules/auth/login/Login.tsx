import React from "react";
import { Button } from "@components/button";
import { useLogin } from "@modules/auth/hooks";
import { FormLayout, FormFieldLayout } from "@components/forms";
import { Form } from "formik";
import { NavLink } from "@components/navLink";

const Login = () => {
  const { validationSchema, initialValues, loading, handleSubmit } = useLogin();
  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-blue-500 text-3xl font-medium font-heading">
        Log In
      </h3>
      <FormLayout
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form className="flex flex-col gap-6">
            <FormFieldLayout name="email" label="Email" size="lg" />
            <FormFieldLayout
              name="password"
              type="password"
              label="Password"
              size="lg"
            />
            <Button
              className="bg-theme !font-normal capitalize text-lg"
              size="sm"
              type="submit"
              loading={loading || props.isSubmitting}
              disabled={loading || props.isSubmitting}
            >
              Log In
            </Button>
          </Form>
        )}
      </FormLayout>
      <p className="text-neutral-900/60 font-heading text-sm sm:text-lg font-normal">
        Don't have account?&nbsp;
        <NavLink href="/signup" className="text-blue-500">
          Sign Up
        </NavLink>
      </p>
    </div>
  );
};

export default Login;
