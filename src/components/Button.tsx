import React from "react";
import "../styles/components/Button.scss";

export default function Button({ children }: { children: React.ReactNode }) {
  return <button className="btn">{children}</button>;
}
