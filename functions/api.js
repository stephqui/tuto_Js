export async function fetchSON(url, options = {}) {
    const header = { Accept: 'application/json', ...options.headers }
    const r = await fetch(url, { ...options.headers })
    if (r.ok) {
        return r.json()
    }
    throw new Error('Erreur serveur', {cause: r})
}