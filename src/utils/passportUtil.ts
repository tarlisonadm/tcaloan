
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import config from '../config/index.js';
import type { UserGoogle } from '../types/UserGoogle.js';
import { randomUUID } from 'node:crypto';
import { findOrCreate } from '../services/googleSheet.js';

passport.use(new GoogleStrategy({
    clientID: config.clientId as string,
    clientSecret: config.clientSecret as string,
    callbackURL: "/auth/google/callback"
},
   async (accessToken, refreshToken, profile, done) => {
        // Aqui você buscaria ou criaria o usuário no seu banco de dados
        // Exemplo: const user = await User.findOrCreate({ googleId: profile.id })

        const user: UserGoogle = {
            id: randomUUID(),
            name: profile.displayName,
            email: profile.email,
            picture: profile.picture,
            type: 'user',
            create_at: new Date().toLocaleDateString("pt-BR").toString(),
        };

        const auth = await findOrCreate('users', user.email, user);

        if(auth) done(null, user);

        return done(null, user);
    }
));

// Necessário para manter a sessão (se não estiver usando JWT puro)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));
