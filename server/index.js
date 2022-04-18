const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = require('./models');

db.sequelize.sync();


const corsOptions = {
    origin: 'http://localhost:3001'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));



app.get('/', (req, res) => {
    res.json({message: 'helloWorld'});
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/contact.routes')(app);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log('Server is running ' + PORT);
})

