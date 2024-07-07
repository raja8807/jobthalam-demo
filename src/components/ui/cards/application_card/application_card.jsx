import React from "react";
import styles from "./application_card.module.scss";
import { Image } from "react-bootstrap";
import { Download, GeoAltFill } from "react-bootstrap-icons";
import Link from "next/link";

const ApplicationCard = ({ application }) => {
  function download(url) {
    const a = document.createElement("a");
    a.setAttribute("download", "resume.pdf");
    // a.download = 'resume.pdf';
    a.href = url;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className={styles.ApplicationCard}>
      <div className={styles.bottom}>
        <div>
          <div className={styles.img}>
            <Image src={"/user.jpg"} alt="company_logo" fluid />
          </div>
          <div>
            <p>{application.candidate.candidate_name}</p>
            <small>
              {application.candidate.candidate_experience} Year(s) Experience
            </small>
          </div>
        </div>
        <div className={styles.status}>
          <div /> {application.status}
        </div>
        {/* <div>{actionButton}</div> */}
      </div>

      <div className={styles.top}>
        <div>
          {/* <p>{application.candidate.candidate_name}</p> */}
          <div>
            <small>
              Education : {application.candidate.candidate_education}
            </small>
            <small>Skill(s) : {application.candidate.skills}</small>
            <div
              onClick={() => {
                download(application.candidate.resume_url);
                // download("");
              }}
            >
              <Download /> Download Resume
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
