export default {
    list : () => {
        const customers = [
            { id: 1, name: 'John Doe', email :"ja@gmail.com"},
            { id: 2, name: 'Jane Doe', email :"a@a.com"},
            { id: 3, name: 'Jim Doe', email :"b@b.com"}
        ];
        return customers;
    },
    create : ({body}:{
        body : {
            name: string;
            email: string;
            phone: string;
        }
    }) => {
        return body;    
    },
    update : ({params, body}:{
        params : {
            id: number;
        },
        body : {
            name: string;
            email: string;
            phone: string;
        }
    }) => {
        return {body: body, id: params.id};    
    },
    remove : ({params}:{
        params : {
            id: number;
        }
    }) => {
        return { id: params.id };    
    }
    // get request
}