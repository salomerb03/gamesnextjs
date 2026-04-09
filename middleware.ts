import { auth } from "./auth";

export default auth((req) => {
    if (!req.auth) {
        return Response.redirect(new URL("/login", req.url));
    }
});

export const config = {
    matcher: ["/games/:path*"], // protege todo /games y sus subrutas
};