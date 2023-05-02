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
    })
    .catch((error) => console.log('error from FL API',error))

    try{
    var array = JSON.parse("[" + res + "]")[0];
      const messageMap = array.reduce((acc, message) => {
      const {name, fields} = message
      
      acc[name] = (
        fields?.reduce((accumaltor, field) => {
          const {name, Value} = field;
          accumaltor[name.toLowerCase()] = Value;
          return accumaltor;
        }, {})
      );

      return acc;
   }, {})

   console.log(messageMap);
   return messageMap;    
  }

  catch(error){
    console.log('error from FL API response', error);
  }
  //return res;
}


export const addItemReq = async(upc, quantity) => {
  let reqArguments ={
    UPC: upc,
    Quantity:quantity
  };
  const req = generateReq(generateReqArrayFiels(reqArguments),"Item")
  console.log('AddItemReq:', req);
  const res =await callAPI('AddItem', req);
  return res;
}

export const voidItemReq = async(upc, quantity) => {
  const reqArguments = {
    UPC: upc,
    Quantity:quantity,
  };

  const req = generateReq(generateReqArrayFiels(reqArguments),"VoidItem")
  console.log('VoidtemReq:', req);
  const res =await callAPI('VoidItem', req);
  return res;
}


export const suspendTransactionReq = async() => {
    const req = generateReq(null,"SuspendTransaction")
    console.log('suspendTransactionReq:', req);
    const res =await callAPI('SuspendTransaction', req);
    return res;
}


const generateReqField = (name, value) => ({
    name: name,
    ftype: "string",
    value: value
  });

  const generateReqArrayFiels =(reqArguments) => {
    let entries = Object.entries(reqArguments)
    let data = entries.map((entry) => {
    const [key, val] = entry;
      return generateReqField(key, val);
    });
    return data;
  }

const generateReq = (fields, name) =>  ({
    fields: fields,
    msgid: "b1",
    name: name
  });


