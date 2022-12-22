import React from 'react';
import CreateApplicantProfile from "../page/CreateApplicantProfile";
import CreateEmployerProfile from "../page/CreateEmployerProfile";

export default function CreateProfile({role}) {
  return (
    <div>
      {
        role === "applicant" ? <CreateApplicantProfile />: <CreateEmployerProfile />
      }
    </div>
  )
}
