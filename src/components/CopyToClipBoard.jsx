import { useState, useEffect } from 'react';
import copy from 'clipboard-copy';

const CopyToClipBoard = (reset = null) => {
  const [copied, setCopied] = useState(false);
  const setClipboard = (pathname) => {
    copy(`https://gui-alucard.github.io${pathname}`);
    setCopied(true);
  };
  useEffect(() => {
    let time;
    if (copied && reset) {
      time = setTimeout(() => setCopied(false), reset);
    }
    return () => {
      clearTimeout(time);
    };
  }, [copied, reset]);
  return [copied, setClipboard];
};
export default CopyToClipBoard;
