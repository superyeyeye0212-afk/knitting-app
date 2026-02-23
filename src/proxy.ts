import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
  localeDetection: true,
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
