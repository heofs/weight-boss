import React from "react";
// import PropTypes from "prop-types";
import { useAuth } from "enhancers/useAuth";

const LoginPage = props => {
  const { signinGoogle } = useAuth();

  return (
    <div>
      <button onClick={() => signinGoogle()}>Login google</button>
    </div>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
