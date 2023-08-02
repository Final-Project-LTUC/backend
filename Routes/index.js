const usersRoutes = require('./userRotes');
const handymenRoutes = require('./handymenRoutes');
const companyRoutes = require('./companyRoutes');

// ...

app.use('/users', usersRoutes);
app.use('/handymen', handymenRoutes);
app.use('/company', companyRoutes);

// ...
