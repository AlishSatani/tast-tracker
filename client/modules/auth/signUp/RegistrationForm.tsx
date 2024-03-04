import React from "react";

import { Form } from "formik";

import { Button } from "@components/button";
import { FormFieldLayout, FormLayout } from "@components/forms";
import { useRegistrationForm } from "../hooks";

const RegistrationForm: React.FC = () => {
  const { validationSchema, initialValues, loading, handleSubmit } =
    useRegistrationForm();
  return (
    <FormLayout
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form className="flex flex-col gap-4">
          <FormFieldLayout
            name="name"
            type="text"
            label="Name"
            size="lg"
            maxLength="24"
          />
          <FormFieldLayout name="email" type="email" label="Email" size="lg" />
          <FormFieldLayout
            name="password"
            type="password"
            label="Password"
            size="lg"
          />
          <FormFieldLayout
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            size="lg"
          />
          <Button
            className="bg-theme !font-normal capitalize text-lg"
            size="sm"
            type="submit"
            loading={loading || props.isSubmitting}
            disabled={loading || props.isSubmitting}
          >
            Create Account
          </Button>
        </Form>
      )}
    </FormLayout>
  );
};

export default RegistrationForm;
