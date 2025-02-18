import { useState } from 'react';

export default function useValidation(jsonData, validationRules) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    const newErrors = {};

    for (const [key, rules] of Object.entries(validationRules)) {
      const value = jsonData[key];

      if (rules.minLength && value.length < rules.minLength) {
        newErrors[key] = `최소 ${rules.minLength}자 이상이어야 합니다.`;
        valid = false;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        newErrors[key] = `최대 ${rules.maxLength}자 이하로 입력해야 합니다.`;
        valid = false;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        newErrors[key] = '형식이 올바르지 않습니다.';
        valid = false;
      }

      if (rules.required && !value) {
        newErrors[key] = '필수 입력 사항입니다.';
        valid = false;
      }
    }

    setErrors(newErrors);

    return valid;
  };

  return { errors, validate };
}
