import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// @emotion/css
import { css } from "@emotion/css";

function PrintAfter({ children, delay, animation }) {
  const [see, setSee] = useState(false);

  useEffect(() => {
    setTimeout(() => setSee(true), delay);
  }, [delay]);

  return (
    <div className={see ? animation : css({ visibility: "hidden" })}>
      {children}
    </div>
  );
}

PrintAfter.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  animation: PropTypes.string,
};

export default PrintAfter;
