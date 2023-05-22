import React from "react";
import { Link } from "react-router-dom";
import AnimatedBackground from "../../components/animatedBackground/animatedBackground";
import errorImage from "../../assets/images/darth-vader-error.png";
import "./404.scss";

const NotFound: React.FC = () => {
  return (
    <div className="error">
      <AnimatedBackground isDarkMode={true} />
      <div className="relative flex flex-col text-white h-screen items-center justify-center">
        <h1 className="text-9xl font-bold text-center mb-10 mt-10">404</h1>
        <p className="subtext">
          you lost your own way<br/>my son
        </p>
        <Link className="back mt-5" to="/">Go back</Link>
        <img className="w-96 mt-10" src={errorImage} alt="404 - Not found" />
      </div>
    </div>
  );
};

export default NotFound;
