import initializeServer from "./initializeServer";

const app = initializeServer()

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server listening on port ${port}`))
import './db'