import React, { ReactElement } from 'react';
import { SubmitHandler, useForm, UseFormProps, FieldErrors } from 'react-hook-form';

type props<T> = {
  form?: UseFormProps<T>;
  children: ReactElement | ReactElement[];
  onSubmit: SubmitHandler<T>;
  // schema?: any;
};

// const useYupValidationResolver = (validationSchema) =>
//   useCallback(
//     async (data) => {
//       try {
//         const values = await validationSchema.validate(data, {
//           abortEarly: false,
//         });

//         return {
//           values,
//           errors: {},
//         };
//       } catch (errors) {
//         return {
//           values: {},
//           errors: errors.inner.reduce(
//             (allErrors, currentError) => ({
//               ...allErrors,
//               [currentError.path]: {
//                 type: currentError.type ?? 'validation',
//                 message: currentError.message,
//               },
//             }),
//             {}
//           ),
//         };
//       }
//     },
//     [validationSchema]
//   );

export default <T,>({ form, children, onSubmit }: props<T>) => {
  // const resolver = useYupValidationResolver(schema);
  const methods = useForm<T>(form);
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) =>
        child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                error: errors[child.props.name as keyof FieldErrors<T>],
                key: child.props.name,
              },
            })
          : child
      )}
    </form>
  );
};
