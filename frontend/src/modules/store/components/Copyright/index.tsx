import "./styles.css";
import { FaReact } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";
import { SiSpringboot } from "react-icons/si";
import GithubLogo from '../../../../assets/images/github-logo.png';

export default function Copyright() {
  return (
    <div className="text-dark">
      <div className="container footer-copyright text-center text-dark py-3">
        <b>© 1989-2024, LWD Store, Inc. or Affiliates</b>
        <br />
        <div className="powered-by">
          <h6 className="font-bold mb-2">Desenvolvido com <br />propósito educacional por:</h6>
          <ul className="github-container">
            <li><img src={GithubLogo} alt="" height={20}/> <a href="https://github.com/westorres9" target="_blank"><b>westorres9</b></a></li>
            <li><img src={GithubLogo} alt="" height={20}/> <a href="https://github.com/wellingtonrsdev" target="_blank"><b>wellingtonrsdev</b></a></li>
            <li><img src={GithubLogo} alt="" height={20}/> <a href="https://github.com/daytorres26" target="_blank"><b>daytorres26</b></a></li>
          </ul>
        </div>
        <div className="powered-by">
          <h6 className="font-bold mb-2 technologies-title">Utilizando as Tecnologias:</h6>
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
