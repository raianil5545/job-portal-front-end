import React from 'react';
import { Link } from 'react-router-dom';


export default function Seachjobs() {
    return (
        <>
            <div className='container-fluid' style={{ padding: "3%", backgroundColor: "#CCE5FF" }}>
                <div className='d-flex justify-content-center'>
                    <form className='d-flex justify-content-center' style={{ width: "60%" }}>
                        <input className='mx-1' type="text" style={{ width: "50%" }} placeholder="Enter Designation, Skills, Company, etc" />
                        <button className='btn-primary'>Search Jobs</button>
                    </form>
                </div>
                <div className='d-flex justify-content-center'>
                    <Link style={{ padding: "25px" }} to="#">All Jobs</Link>
                    <Link style={{ padding: "25px" }} to="#">by Organisation</Link>
                    <Link style={{ padding: "25px" }} to="#">by Job Category</Link>
                    <Link style={{ padding: "25px" }} to="#">by Job Title</Link>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{padding: "2%"}}>
                <select className='mx-2' name="category" id="category">
                    <option value="" selected disabled hidden>Job Categories</option>
                    <option value="Architecture / Interior Designing">Architecture / Interior Designing</option>
                    <option value="Construction / Engineering / Architects">Construction / Engineering / Architects</option>
                    <option value="Commercial / Logistics / Supply Chain">Commercial / Logistics / Supply Chain</option>
                    <option value="Creative / Graphics / Designing">Creative / Graphics / Designing</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Others">Others</option>
                    <option value="NGO / INGO / Social work">NGO / INGO / Social work</option>
                    <option value="Teaching / Education">Teaching / Education</option>
                    <option value="General Mgmt. / Administration / Operations">General Mgmt. / Administration / Operations</option>
                    <option value="Healthcare / Pharma / Biotech / Medical / R&D">Healthcare / Pharma / Biotech / Medical / R&D</option>
                    <option value="Human Resource /Org. Development">Human Resource /Org. Development</option>
                    <option value="Sales / Public Relations">Sales / Public Relations</option>
                    <option value="Research and Development">Research and Development</option>
                    <option value="Production / Maintenance / Quality">Production / Maintenance / Quality</option>
                    <option value="Marketing / Advertising / Customer Service">Marketing / Advertising / Customer Service</option>
                    <option value="Legal Services">Legal Services</option>
                    <option value="Accounting / Finance">Accounting / Finance</option>
                    <option value="Banking / Insurance /Financial Services">Banking / Insurance /Financial Services</option>
                    <option value="Fashion / Textile Designing">Fashion / Textile Designing</option>
                    <option value="Secretarial / Front Office / Data Entry">Secretarial / Front Office / Data Entry</option>
                    <option value="IT & Telecommunication">IT & Telecommunication</option>
                    <option value="Protective / Security Services">Protective / Security Services</option>
                    <option value="Journalism / Editor / Media">Journalism / Editor / Media</option>
                </select>
                <select className='mx-2' name="industry" id="industry">
                    <option value="" selected disabled hidden>Industry</option>
                    <option value="Advertising Agency">Advertising Agency</option>
                    <option value="Airlines / GSA">Airlines / GSA</option>
                    <option value="Architecture / Interior Design Firm">Architecture / Interior Design Firm</option>
                    <option value="Audit Firms / Tax Consultant">Audit Firms / Tax Consultant</option>
                    <option value="Automotive Sales, Support & Service">Automotive Sales, Support & Service</option>
                    <option value="Banks">Banks</option>
                    <option value="Banquet / Catering">Banquet / Catering</option>
                    <option value="BPO / Call Center / ITES">BPO / Call Center / ITES</option>
                    <option value="Construction / Real Estate">Construction / Real Estate</option>
                    <option value="Consulting / Legal">Consulting / Legal</option>
                    <option value="Consumer Products / FMCG">Consumer Products / FMCG</option>
                    <option value="Designing / Printing / Publishing">Designing / Printing / Publishing</option>
                    <option value="Direct Sells / Marketing Service">Direct Sells / Marketing Service</option>
                    <option value="Distribution Companies / Wholesale">Distribution Companies / Wholesale</option>
                    <option value="Education - School & Colleges">Education - School & Colleges</option>
                    <option value="Embassies / Foreign Consulate">Embassies / Foreign Consulate</option>
                    <option value="Engineering Firms">Engineering Firms</option>
                    <option value="Event Management">Event Management</option>
                    <option value="Finance Companies">Finance Companies</option>
                    <option value="Garments / Carpet Industries">Garments / Carpet Industries</option>
                    <option value="Hardware / Network Companies">Hardware / Network Companies</option>
                    <option value="Hospital / Clinic / Diagnostic Centre">Hospital / Clinic / Diagnostic Centre</option>
                    <option value="Hotels / Resorts / Restaurant">Hotels / Resorts / Restaurant</option>
                    <option value="Hydropower / Alternate Energy">Hydropower / Alternate Energy</option>
                </select>
                <select className='mx-2' name="education" id="education">
                    <option value="" selected disabled hidden>Education</option>
                    <option value="Ph. D.">Ph. D.</option>
                    <option value="Master">Master</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="SLC (10th)">SLC (10th)</option>
                    <option value="Other">Other</option>
                </select>
                <select className='mx-2' name="joblevel" id="joblevel">
                    <option value="" selected disabled hidden>Job Level</option>
                    <option value="Top Level">Top Level</option>
                    <option value="Senior Level">Senior Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Entry Level">Entry Level</option>
                </select>
                <select className='mx-2' name="employmenttype" id="employmenttype">
                    <option value="" selected disabled hidden>Employment Type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                    <option value="Traineeship">Traineeship</option>
                </select>
                <button className='btn-primary mx-2'>Clear all</button>
            </div>
        </>
    )
}
