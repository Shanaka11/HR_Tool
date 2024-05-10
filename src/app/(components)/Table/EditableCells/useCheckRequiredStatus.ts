import { useState } from "react";

type useCheckRequiredStatusProps = {
  required?: boolean;
};
export const useCheckRequiredStatus = ({
  required,
}: useCheckRequiredStatusProps) => {
  const [showRequiredError, setShowRequiredError] = useState(required);

  const checkShowRequiredError = (value: string) => {
    if (value === "" && required) {
      setShowRequiredError(true);
      return;
    }
    if (required) {
      setShowRequiredError(false);
      return;
    }
  };

  return {
    showRequiredError,
    checkShowRequiredError,
  };
};
