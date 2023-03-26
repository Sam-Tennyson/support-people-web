import React from "react";
import Tippy from "@tippyjs/react";
import {followCursor} from 'tippy.js';
import "./style.scss"

const ReactTippy = ({ TippyContent, buttonName,placement ,interactive, hideOnClick, onClickOutside, visible, children }) => {
  return (
    <>
      <Tippy
        className="tippyCustomClass  "
        placement={placement}
        content={TippyContent}
        interactive={interactive}
        hideOnClick={false}
        plugins={[followCursor]}
        visible={visible}
        onClickOutside={onClickOutside}
      >
        {children}
      </Tippy>
    </>
  );
};

export default ReactTippy;
