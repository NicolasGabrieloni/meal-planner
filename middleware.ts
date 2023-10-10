export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/home", "/calendar", "/depot", "/recipes", "/shop-list"],
};
