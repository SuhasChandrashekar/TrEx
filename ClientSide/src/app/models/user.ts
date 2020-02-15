export class User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    userLastname: string;
    userDOB: string;
    userAddress: string;
    userCity: string;
    userState: string;
    userPhoneNumber : string;
    userCards :[
        {cardNo: string,
          cardtype:string,
         nameonCard:string,
         expMonth: string,
         expYear:string,
         cvv:string
        }
    ]
    token: string;
}
