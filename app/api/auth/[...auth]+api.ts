import { auth } from "../../../src/lib/auth";

 
const handler = auth.handler;
export { handler as GET, handler as POST }; // export handler for both GET and POST requests