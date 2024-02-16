import React, { useEffect } from 'react';

function Alert(props) {
  const capitalize = (text) => {
    if (typeof text !== 'string') {
      return '';
    }

    let newString = text.charAt(0).toUpperCase() + text.slice(1);
    return newString;
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.closeAlert();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [props]);

  const alertStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    width: '100%',
    maxWidth: '400px',
  };

  return (
    props.alert && (
      <div style={alertStyle}>
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          {props.alert.message}
        </div>
      </div>
    )
  );
}

export default Alert;
