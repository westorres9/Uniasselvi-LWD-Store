import "./styles.css";
import { FaReact } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";
import { SiSpringboot } from "react-icons/si";

export default function Copyright() {
  return (
    <div className="text-dark">
      <div className="container footer-copyright text-center text-dark py-3">
        © 1989-2024, ToolStorePRO, Inc. or Affiliates
        <div className="powered-by">
          <h4 className="font-bold mb-2">Made for Education Purpose With:</h4>
          <div className="tech-icons">
            <FaJava
              className="text-danger"
              width={"40px"}
              height={"40px"}
              size={"2x"}
            />
            <SiSpringboot
              className="text-success"
              width={"40px"}
              height={"40px"}
              size={"2x"}
            />
            <FaReact
              className="text-info"
              width={"40px"}
              height={"40px"}
              size={"2x"}
            />
            <SiTypescript
              className="text-navy"
              width={"40px"}
              height={"40px"}
              size={"2x"}
            />
            <SiPostgresql
              className="text-navy"
              width={"40px"}
              height={"40px"}
              size={"2x"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
