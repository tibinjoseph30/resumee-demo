import { useState, useEffect } from 'react';
import universityData from './api/universities.json';

type University = {
  name: string;
};

type OptionType = {
  value: string;
  label: string;
};

export const useUniversitySelect = () => {
  const [university, setUniversity] = useState<OptionType[]>([]);

  useEffect(() => {
    const initialData = universityData as University[];

    const formattedCourses = initialData.map((university) => ({
      value: university.name,
      label: university.name,
    }));

    setUniversity(formattedCourses);
  }, []);

  const universityOptions = () => university;

  return {
    universityOptions
  };
};