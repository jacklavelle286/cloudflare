addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname.startsWith('/en-CR')) {
    // Clone the request to modify headers
    const modifiedRequest = new Request(request, {
      headers: new Headers(request.headers)
    });

    // Remove headers that might reveal the original location
    modifiedRequest.headers.delete('CF-Connecting-IP');
    modifiedRequest.headers.delete('X-Forwarded-For');
    modifiedRequest.headers.delete('CF-IPCountry');
    modifiedRequest.headers.delete('Referer');

    // Optionally, set a generic user-agent or other headers
    modifiedRequest.headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    return fetch(modifiedRequest);
  }

  // For other paths, just pass the request through
  return fetch(request);
}
