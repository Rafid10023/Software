import React, { useState, useEffect } from 'react';
import './index.css';
import AppRoutes from './Routes';

export default function App() {

  return (
    <AppRoutes/>
  );
}

// import React, { useState, useEffect } from 'react';

// function App() {
//   const [walkers, setWalkers] = useState([]);

//   useEffect(() => {
//     fetch('http://127.0.0.1:5000/walkers')
//       .then(res => res.json())
//       .then(data => {
//         setWalkers(data.walkers);
//       })
//       .catch(error => console.error('Error:', error));
//   }, []);

//   return (
//     <div>
//       <h1>Walkers</h1>
//       <ul>
//         {walkers.map((walker, index) => (
//           <li key={index}>{walker}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;