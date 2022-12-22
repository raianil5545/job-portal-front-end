import React from 'react';
import { ContextProfile } from '../Context/Context';
import UpdateApplicantProfile from '../page/UpdateApplicantProfile';
import UpdateEmployerProfile from '../page/UpdateEmployerProfile'


export default function UpdateProfile({ role }) {
  const {profile} = React.useContext(ContextProfile);
  return (
    <div>
      {
        role === "applicant" ?
          <UpdateApplicantProfile profile={profile?.profile} /> :
          <UpdateEmployerProfile profile={profile?.profile} />
      }
    </div>
  )
}
