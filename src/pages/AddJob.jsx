import React from 'react';
import JobForm from '../components/JobForm'; // ← Ajoutez cette ligne
const AddJob = () => {
  return (
    <div className="py-10 px-4">
      <JobForm />
    </div>
  );
};

export default AddJob;