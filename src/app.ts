import express from 'express';
import passport from 'passport';
import session from 'express-session';
import './utils/passportUtil.js'; // Importa a config
import router from './routes/authRoutes.js';
import config from './config/index.js';

const app = express();

// Renderização de paginas ejs
app.set('view engine', 'ejs');
app.set('views', 'src/views/pages');

// Middleware de sessão (Obrigatório para o Passport)
app.use(session({ secret: 'secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

export default ({
    run: () => {
        app.listen(config.port, () => {
            console.log(`Servidor rodando na porta ${config.port}`);
        });
    }
})