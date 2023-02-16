import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import app from "./index.js";
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'first brand API',
        description: ' all about my Brand-Api',
        version: '1.0.0',
      },

      contact: {
        name: "Bukarani",
        email: "calvinBukarani@gmail.com",
        url: "web.com",
      },

      servers:[
        {
         url:'http://localhost:5000/'   
        },
        {
          url:'https://buka-dev.onrender.com/'
        }
      ]
  },
  apis:['./vscode/routes/routes.js']
    }

    const swaggerSpec = swaggerJSDoc(options)

    function swaggerDocs(app, port){
        // swagger page
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

        //document in json format
        app.get('/docs.json', (req, res)=>{
         res.setHeader('Content-type', 'application/json')
         res.send(swaggerSpec)
        })
    }

    export default swaggerDocs