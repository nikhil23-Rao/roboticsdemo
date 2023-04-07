import React from "react";

interface IProps {
  username: string;
  role: string;
  imageUrl: string;
  onClick: () => void;
}

const SubmitButton = ({ username, role, imageUrl, onClick }: IProps) => {
  return (
    <button
      type="reset"
      style={{
        backgroundColor:
          username.length > 0 && imageUrl.length > 0 && role.length > 0
            ? ""
            : "gray",
        cursor:
          username.length > 0 && imageUrl.length > 0 && role.length > 0
            ? ""
            : "not-allowed",
      }}
      disabled={
        username.length > 0 && imageUrl.length > 0 && role.length > 0
          ? false
          : true
      }
      onClick={onClick}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
