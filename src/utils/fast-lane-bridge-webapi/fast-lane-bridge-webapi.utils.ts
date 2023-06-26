import { Dispatch } from "redux"
import { Item } from "../../store/cart/cart.types"

export type Request = {
  fields: FieldRequest[] | null,
  name: string
}

export type FieldRequest = {
  name: string,
  value: string
}

export type MyResponse = {
  fields: FieldResponse[] | null,
  name: string
}

export type FieldResponse = {
  name: string,
  Value: string
}

export  type ResponseMap = {
  [key: string]: FieldResponseMap | undefined;
}

export  type FieldResponseMap = {
  [key: string]: string;
}


type ApiActions = {
  [key: string]: (...args: any[]) => Promise<ResponseMap | null>; // Replace 'void' with the appropriate return type for your functions
}



export type InitRequest = {
  method: string
  headers: HeaderRequest
  body: string
  credentials: RequestCredentials
}

export type HeaderRequest = {
  'Content-Type': string
}

export const callApi = (actionName: string, payload: Object | null, dispatch: Dispatch): Promise<ResponseMap | null>  => 
  new Promise<ResponseMap>((resolve: (value: ResponseMap | PromiseLike<ResponseMap>) => void, reject: (error: Error) => void) => {
    dispatch({ type: actionName, payload, resolve, reject });
  });


const callApiFLWebService= async(actionName: string,req: Request): Promise<ResponseMap |  null> =>{
    const header = {
        'Content-Type': 'application/json',
      };

    const reqInit: InitRequest = {
        method: 'Post',
        //mode: 'no-cors',
        headers: header,
        body: JSON.stringify(req),
        credentials: 'include',
      };
    
    var res:Response ;
    let messageMap: ResponseMap;


    return new Promise((resolve, reject) => {
       fetch(`http://localhost/FLWebAPI/api/FastLane/${actionName}`,reqInit)
      .then((response) => 
      {
        res = response;
        if (response.ok) {
          return response.text();
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      })
      .then((result) => {
        var array: MyResponse[] = JSON.parse("[" + result + "]")[0];
        messageMap = array.reduce((acc, message) => {
            const {name, fields}: MyResponse = message;
            acc[name] = (
              fields?.reduce((accumaltor, field): FieldResponseMap => {
                const {name, Value} = field;
                accumaltor[name.toLowerCase()] = Value;
                return accumaltor;
              }, {} as FieldResponseMap) 
            );

          return acc;
        }, {} as ResponseMap)

        console.log(`${actionName}Response:`, messageMap);
        resolve(messageMap);
      })

    .catch(error => {
      res.text().then(data => {
        console.log(data);
      });
      reject('Failed to fetch data');
    })
  });
}

export const initReq = async(machineName: string) => {
  const reqArguments = {
    MachineName: machineName
  }
  const req = generateReq(generateReqArrayFiels(reqArguments),"Initialize")
  console.log('InitializeReq:', req);
  const res =await callApiFLWebService('init', req);
  return res;
}

export type SignInRequest = {
  userId: number,
  password:number
}

export const signInReq = async({userId, password}: SignInRequest) => {
  const reqArguments ={
    UserId: userId,
    Password:password
  };
  const req = generateReq(generateReqArrayFiels(reqArguments),"SignOn")
  console.log('SignOnReq:', req);
  const res =await callApiFLWebService('Signon', req);
  return res;
}
 
export const addCustomerReq = async(customerNumber: string) => {
  const reqArguments = {
    CustomerNumber: customerNumber
  }
  const req = generateReq(generateReqArrayFiels(reqArguments),"AddCustomerByManualCard")
  console.log('AddCustomerReq:', req);
  const res =await callApiFLWebService('AddCustomer', req);
  return res;
}

export const addItemReq = async({upc, quantity = 1}: Item) => {
  let reqArguments ={
    UPC: upc,
    Quantity:quantity
  };
  const req = generateReq(generateReqArrayFiels(reqArguments),"Item")
  console.log('AddItemReq:', req);
  const res =await callApiFLWebService('AddItem', req);
  return res;
}

export const voidItemReq = async({upc, quantity=1}: Item) => {
  const reqArguments = {
    UPC: upc,
    Quantity:quantity,
  };

  const req = generateReq(generateReqArrayFiels(reqArguments),"VoidItem")
  console.log('VoidtemReq:', req);
  const res =await callApiFLWebService('VoidItem', req);
  return res;
}


export const suspendTransactionReq = async() => {
    const req = generateReq(null,"SuspendTransaction")
    console.log('suspendTransactionReq:', req);
    const res =await callApiFLWebService('SuspendTransaction', req);
    return res;
}

export const voidTransactionReq = async() => {
  const req = generateReq(null,"VoidTransaction")
  console.log('VoidTransactionReq:', req);
  const res =await callApiFLWebService('VoidTransaction', req);
  return res;
}



const generateReqField = (name: string, value: string) => ({
    name: name,
    value: value
  });

  const generateReqArrayFiels =(reqArguments: Object): FieldRequest[] => {
    let entries = Object.entries(reqArguments)
    let data = entries.map((entry) => {
    const [key, val] = entry;
      return generateReqField(key, val);
    });
    return data;
  }

const generateReq = (fields: FieldRequest[] | null, name: string) =>  ({
    fields: fields,
    name: name
  });


  export const apiActions: ApiActions = {
    initReq,
    signInReq,
    addCustomerReq,
    suspendTransactionReq,
    voidTransactionReq,
    addItemReq,
    voidItemReq
  };
  
  
  
  


