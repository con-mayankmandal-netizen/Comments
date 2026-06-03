// Comments proxy — validates PocketFM CMS auth, forwards API calls with CORS for GitHub Pages.

const CMS_API = 'https://api.cms.pocketfm.com';
const CMS_VERIFY_URL =
  'https://api.cms.pocketfm.com/v2/content_api/book.episode_details?chapter_id=17815f5a15ba35e13c1a7500a1f7567859e4dc26&is_novel=0';

const ALLOWED_ORIGINS = [
  'https://con-mayankmandal-netizen.github.io',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
];

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname === '/' || url.pathname === '/health') {
      return new Response('comments-proxy OK', {
        headers: { 'Content-Type': 'text/plain', ...cors },
      });
    }

    const accessToken =
      request.headers.get('x-access-token') || request.headers.get('access-token');
    const uid = request.headers.get('x-uid') || request.headers.get('uid');

    if (!accessToken || !uid) {
      return jsonError('Missing CMS auth (access-token / uid)', 401, cors);
    }

    let cmsOk;
    try {
      cmsOk = await verifyCMS(accessToken, uid);
    } catch (e) {
      return jsonError('CMS verification error: ' + e.message, 502, cors);
    }
    if (!cmsOk) {
      return jsonError('Invalid CMS auth', 403, cors);
    }

    if (url.pathname.startsWith('/cms/')) {
      const path = url.pathname.replace(/^\/cms/, '') + url.search;
      return forwardCMS(request, CMS_API + path, accessToken, uid, cors);
    }

    return jsonError('Unknown route. Use /cms/v2/social/...', 404, cors);
  },
};

async function verifyCMS(accessToken, uid) {
  const r = await fetch(CMS_VERIFY_URL, { headers: cmsHeaders(accessToken, uid) });
  if (r.status === 401 || r.status === 403) return false;
  return true;
}

function cmsHeaders(accessToken, uid) {
  return {
    'access-token': accessToken,
    uid,
    'app-client': 'consumer-web',
    'app-version': '180',
    'auth-token': 'web-auth',
    source: 'cms',
  };
}

async function forwardCMS(request, target, accessToken, uid, cors) {
  const upstreamHeaders = new Headers();
  if (request.headers.get('Accept')) {
    upstreamHeaders.set('Accept', request.headers.get('Accept'));
  }
  if (request.headers.get('Content-Type')) {
    upstreamHeaders.set('Content-Type', request.headers.get('Content-Type'));
  }
  for (const [k, v] of Object.entries(cmsHeaders(accessToken, uid))) {
    upstreamHeaders.set(k, v);
  }

  const upstream = await fetch(target, {
    method: request.method,
    headers: upstreamHeaders,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer(),
  });

  const respHeaders = new Headers(upstream.headers);
  Object.entries(cors).forEach(([k, v]) => respHeaders.set(k, v));

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: respHeaders,
  });
}

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type,Accept,access-token,uid,x-access-token,x-uid,app-version,auth-token,app-client,Source',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function jsonError(msg, status, cors) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}
