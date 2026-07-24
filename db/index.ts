/**
 * Database adapter boundary.
 *
 * The public site currently uses the repository in data/catalog.ts. A future
 * Supabase/Postgres adapter can implement the same CatalogRepository contract
 * without coupling the application to a hosting provider.
 */
export const databaseProvider = "not-configured" as const;
