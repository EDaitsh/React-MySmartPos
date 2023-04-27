// import { useState, useEffect } from 'react';

// const useApi = (actionName,req, uuid = null) => {
//     const [response, setResponse] = useState(null);

//     console.log('useApi');
//     const header = {
//         'Content-Type': 'application/json',
//       };

//     const reqInit = {
//         method: 'Post',
//         //mode: 'no-cors',
//         headers: header,
//         body: JSON.stringify(req),
//         credentials: 'include',
//       };
      

//     useEffect(() => {
//         console.log(`Start ${actionName}`)
//         fetch(`http://localhost/FLWebAPI/api/FastLane/${actionName}`,reqInit)
//         .then((response) => response.text())
//         .then((result) => {
//             setResponse(result);
//             console.log(result);
//             console.log(`End ${actionName}`)
//         })
//       }, [actionName, req, uuid]);

//       return response;

// }

// export default useApi

export const callAPI= async(actionName,req) =>{
    console.log('callApi');
    const header = {
        'Content-Type': 'application/json',
      };

    const reqInit = {
        method: 'Post',
        //mode: 'no-cors',
        headers: header,
        body: JSON.stringify(req),
        credentials: 'include',
      };
    
    var res = null;

    console.log(`Start ${actionName}`)
    await fetch(`http://localhost/FLWebAPI/api/FastLane/${actionName}`,reqInit)
    .then((response) => response.text())
    .then((result) => {
        res= result;
        console.log(result);
        console.log(`End ${actionName}`)
    })

  return res;
}