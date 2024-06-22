import React from 'react';

const Loading = () => {
  return (
    <>
      <button className="loader__btn">
        <div className="loader"></div>
        Loading ...
      </button>
    </>
  );
};

export default Loading;

const styles = `
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Adjust as needed */
  }

  .loader__btn {
    border: none;
    background-color: white;
    padding: 15px 25px; /* Increase padding for larger size */
    display: flex;
    align-items: center;
    gap: 15px;
    color: rgba(0, 0, 0, 0.7);
    font-size: 18px; /* Increase font size for larger size */
    border-radius: 12px;
    --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),
      0 8px 10px -6px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    cursor: wait;
  }

  .loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: transparent;
    border-radius: 50%;
    width: 33px; /* Increase size of the loader */
    height: 33px; /* Increase size of the loader */
    animation: spin89345 1s linear infinite;
  }

  @keyframes spin89345 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

// Rest of your component code...



const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
