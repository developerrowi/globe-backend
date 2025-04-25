import express from 'express';
import { NODE_ENV, PORT } from './config';
import router from './router'
import secureMiddleware from './middleware/token.middleware';


var cors = require('cors')
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.app.use(cors(corsOptions))

    this.app.options('*', (req: any, res: any) => {
      res.sendStatus(200);
    });

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`app starting....`)
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  private initializeMiddlewares() {;
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(secureMiddleware)

  }

  private initializeRoutes() {
    this.app.use(router)
  }
}

export default App;

