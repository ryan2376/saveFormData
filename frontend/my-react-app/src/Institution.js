// import React, { useState } from 'react';
// import './Institution.css';

// const Institution = () => {
//   // State for institution details
//   const [institutionDetails, setInstitutionDetails] = useState({
//     name: '',
//     location: '',
//     activities: '',
//     contactPerson: '',
//     contactEmail: '',
//     contactPhone: '',
//   });

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInstitutionDetails({
//       ...institutionDetails,
//       [name]: value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Perform validation if needed

//     // Save institution details to the database
//     try {
//       const response = await fetch('http://localhost/saveFormData/backend/saveInstitutionData.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(institutionDetails),
//       });

//       if (response.ok) {
//         console.log('Institution data submitted successfully');
//         // Handle success, e.g., show a success message to the user
//       } else {
//         console.error('Institution data submission failed');
//         // Handle failure, e.g., show an error message to the user
//       }
//     } catch (error) {
//       console.error('An error occurred during institution data submission:', error);
//     }
//   };

//   return (
//     <div className="institution-container">
//       <header className="institution-header">
//         <h1>Institution Dashboard</h1>
//       </header>

//       <section className="institution-form">
//         <h2>Enter Institution Details</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={institutionDetails.name}
//               onChange={handleInputChange}
//             />
//           </label>

//           <label>
//             Location:
//             {/* You can include a map API integration for location input */}
//             <input
//               type="text"
//               name="location"
//               value={institutionDetails.location}
//               onChange={handleInputChange}
//             />
//           </label>

//           <label>
//             Activities:
//             <textarea
//               name="activities"
//               value={institutionDetails.activities}
//               onChange={handleInputChange}
//             />
//           </label>

//           <label>
//             Contact Person:
//             <input
//               type="text"
//               name="contactPerson"
//               value={institutionDetails.contactPerson}
//               onChange={handleInputChange}
//             />
//           </label>

//           <label>
//             Contact Email:
//             <input
//               type="email"
//               name="contactEmail"
//               value={institutionDetails.contactEmail}
//               onChange={handleInputChange}
//             />
//           </label>

//           <label>
//             Contact Phone:
//             <input
//               type="tel"
//               name="contactPhone"
//               value={institutionDetails.contactPhone}
//               onChange={handleInputChange}
//             />
//           </label>

//           <button type="submit">Submit</button>
//         </form>
//       </section>

//       <section className="activity-posting">
//         <h2>Post a New Activity</h2>
//         {/* Form to post a new activity */}
//         {/* ... */}
//       </section>

//       <section className="activity-management">
//         <h2>Manage Activities</h2>
//         {/* Table or list to manage activities */}
//         {/* ... */}
//       </section>

//       <section className="analytics-overview">
//         <h2>Analytics Overview</h2>
//         {/* Analytics and insights */}
//         {/* ... */}
//       </section>
//     </div>
//   );
// };

// export default Institution;
