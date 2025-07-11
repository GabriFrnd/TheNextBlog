import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey); /* Versão codificada da chave */

const loginExpirationSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpirationString = process.env.LOGIN_EXPIRATION_STRING || '1d';

const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';

type JwtPayload = {
  username: string;
  expiresAt: Date;
};

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  const base64 = Buffer.from(hash).toString('base64');

  return base64;
}

export async function verifyPassword(password: string, base64Hash: string) {
  const hash = Buffer.from(base64Hash, 'base64').toString('utf-8');
  const isValid = await bcrypt.compare(password, hash);

  return isValid;
}

export async function createLoginSession(username: string) { /* Cria uma sessão de login básica e a armazena em um cookie */
  const expiresAt = new Date(Date.now() + loginExpirationSeconds * 1000); /* 24 horas */
  const loginSession = await signJwt({ username, expiresAt });
  const cookieStore = await cookies(); /* Espera obter o objeto que representa os cookies da requisição atual */

  cookieStore.set(loginCookieName, loginSession, { /* Definição de um cookie seguro */
    httpOnly: true, /* Cookie inacessível ao JavaScript do cliente (proteção contra XSS) */
    secure: true, /* Cookie enviado apenas via HTTPS */
    sameSite: 'strict', /* Cookie só será enviado na mesma origem (proteção contra CSRF) */
    expires: expiresAt, /* Expiração do cookie */
  });
}

export async function deleteLoginSession() {
  const cookieStore = await cookies(); /* Espera obter o objeto que representa os cookies da requisição atual */
  cookieStore.set(loginCookieName, '', { expires: new Date(0) });

  cookieStore.delete(loginCookieName);
}

export async function getLoginSession() {
  const cookieStore = await cookies(); /* Espera obter o objeto que representa os cookies da requisição atual */
  const jwt = cookieStore.get(loginCookieName)?.value;

  if (!jwt) return false;
  return verifyJwt(jwt);
}

export async function verifyLoginSession() {
  const jwtPayload = await getLoginSession();
  if (!jwtPayload) return false;

  return jwtPayload?.username === process.env.LOGIN_USER;
}

export async function requireLoginSessionOrRedirect() {
  const isAuthenticated = await getLoginSession();

  if (!isAuthenticated) {
    redirect('/admin/login');
  }
}

export async function signJwt(jwtPayload: JwtPayload) { /* Gera (ou assina) um token JWT (JSON Web Token) */
  return new SignJWT(jwtPayload)
    .setProtectedHeader({
      alg: 'HS256', /* Algoritmo de assinatura */
      typ: 'JWT', /* Tipo de token */
    })
    .setIssuedAt() /* Momento em que o token foi criado */
    .setExpirationTime(loginExpirationString) /* Tempo de expiração do token */
    .sign(jwtEncodedKey); /* Assina o token usando uma chave secreta (jwtEncodedKey) */
}

export async function verifyJwt(jwt: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodedKey, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch {
    return false;
  }
}
