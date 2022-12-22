import React from 'react';
import { useSelector } from 'react-redux';
import ApplicantProfile from './ApplicantProfile';
import EmployerProfile from './EmployerProfile';
import { ContextProfile } from '../Context/Context';


export default function ShowProfile({ role }) {
  const {profile} = React.useContext(ContextProfile);
  return (
    <div>
      {
        role === "employer" ? <EmployerProfile profile={profile?.profile} /> : <ApplicantProfile profile={profile?.profile} />
      }
    </div>
  )
}
