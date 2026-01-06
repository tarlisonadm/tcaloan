import { Router } from "express";
import passport from "passport";
import { findRowsAndConvertToObject } from "../services/googleSheet.js";

const router = Router();

// --- ROTAS ---

// 0. Rota login
router.get('/', (req, res) => {
  res.render('login');
})

// 1. Rota que inicia o login
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 2. Rota de callback (onde o Google redireciona o usuário)
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Sucesso! Redirecione para o dashboard ou retorne um JWT  
  res.redirect('/dashboard')
}
);

// 3. Rota que inicia o dashboard
router.get('/dashboard', async (req, res) => {
  const loans = await findRowsAndConvertToObject('loan');
  res.render('dashboard', { user: req.user, loans });
});


export default router;