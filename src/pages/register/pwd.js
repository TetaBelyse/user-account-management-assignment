import React, { useState } from "react";

const StrongPasswordInput = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (password) => {
    // Define your password validation criteria
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = regex.test(password);

    if (isValid) {
      setError("");
    } else {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }
  };

  return (
    <div>
      <input type="password" value={password} onChange={handlePasswordChange} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default StrongPasswordInput;
