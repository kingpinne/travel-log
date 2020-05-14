import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createLogEntry } from './API';

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.longitude = location.longitude;
      data.latitude = location.latitude;

      const created = await createLogEntry(data);
      console.log(created);
      onClose();
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input autoComplete="off" name="title" ref={register} required />
      <label htmlFor="descprition">Description</label>
      <textarea autoComplete="off" name="description" rows={3} ref={register} />

      <label htmlFor="comments">Comments</label>
      <textarea
        autoComplete="off"
        name="comments"
        rows={3}
        ref={register}
      ></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" ref={register} />
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" ref={register} required />
      <button disabled={loading}>{loading ? 'Loading' : 'Create Entry'}</button>
    </form>
  );
};

export default LogEntryForm;
