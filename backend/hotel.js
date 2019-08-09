var Request = require("request");
const router = Router();


export default function makeApiCall() {
    router.get('/', (req, res) => {

        Request.get("http://www.googleapis.com/travelpartner/v2.0/AIzaSyA8mG_bSeuX3i5KhmnkBzX7zKMWamCA3Rs", (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            console.dir(JSON.parse(body));
        });
    
        return res.send(data);
    });
}

// export default router;
