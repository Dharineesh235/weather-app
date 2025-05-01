"use client";

import React, { ReactNode } from "react";

const Alert = ({
  children,
  className = "",
  style = {},
  alert,
}: {
  children: ReactNode;
  className?: string
  style?: Record<string, string>;
  alert: number;
}) => {
  return (
    <>
      {alert ? (
        <div className={className + ' rounded-sm alert'} style={{ ...style }}>
          {children}
        </div>
      ) : null}
    </>
  );
};

export default Alert;
