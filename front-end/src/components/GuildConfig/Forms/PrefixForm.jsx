
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { Button, Input, useToast } from '@chakra-ui/react';
import { updatePrefixMutation } from '../../../graphql/mutations/updatePrefix';
import '../index.css';

export const PrefixForm = ({
  prefix,
  guildID,
}) => {

  const [cmdPrefix, setCmdPrefix] = useState(prefix);
  const [updatePrefix] = useMutation(updatePrefixMutation);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      prefix : cmdPrefix,
    },
    onSubmit: ( value ) => {
      updatePrefix({
        variables: {
          guildID,
          prefix: cmdPrefix,
        },
      })
        .then((result) =>
          toast({
            title: "Prefix Updated",
            description: "You have successfully updated your Guild Prefix!",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        )
        .catch((err) =>
          toast({
            title: "An error occured...",
            description: "Something went wrong with updating the prefix.",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        );
    }
  });

  const handleChange = ( e ) => {
    e.preventDefault();
    const { value } = e.target;
    setCmdPrefix(value);
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Input className="prefix-input" value={cmdPrefix} onChange={handleChange} />
      <Button
        className="prefix-btn-submit"
        type="submit"
        variant="solid"
        variantColor="orange"
        children="Submit" />
    </form>
  )
}