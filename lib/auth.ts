import { Adapter, AdapterUser } from "next-auth/adapters";
import { db } from "./db";
import { users, accounts, sessions, verificationTokens } from "./schema";
import { eq, and } from "drizzle-orm";
import type { AdapterAccount, AdapterSession, VerificationToken } from "next-auth/adapters";

export function DazzleAdapter(): Adapter {
  return {
    // USERS

    async createUser(user: AdapterUser) {
      const [newUser] = await db
        .insert(users)
        .values({
          name: user.name ?? "",
          email: user.email,
          password: (user as any).password ?? "",
          profilePicture: user.image ?? null,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return newUser as unknown as AdapterUser;
    },

    async getUser(id: string) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, Number(id)));
      return user as unknown as AdapterUser ?? null;
    },

    async getUserByEmail(email: string) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      return user as unknown as AdapterUser ?? null;
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const [account] = await db
        .select()
        .from(accounts)
        .where(and(
          eq(accounts.provider, provider),
          eq(accounts.providerAccountId, providerAccountId)
        ));

      if (!account) return null;

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, account.userId));

      return user as unknown as AdapterUser ?? null;
    },

    async updateUser(user) {
      const [updatedUser] = await db
        .update(users)
        .set({
          name: user.name ?? undefined,
          email: user.email,
          password: (user as any).password ?? "",
          profilePicture: user.image ?? null,
          updatedAt: new Date(),
        })
        .where(eq(users.id, Number(user.id)))
        .returning();

      return updatedUser as unknown as AdapterUser ?? null;
    },

    async deleteUser(userId: string) {
      await db.delete(users).where(eq(users.id, Number(userId)));
    },

    // ACCOUNTS

    async linkAccount(account: AdapterAccount) {
      await db.insert(accounts).values({
        userId: Number(account.userId), // convert to number as schema expects number
        type: account.type,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        access_token: account.access_token,
        expires_at: account.expires_at ? new Date(account.expires_at * 1000) : undefined, // convert to Date if needed
        id_token: account.id_token,
        scope: account.scope,
        token_type: account.token_type,
        refresh_token: account.refresh_token,
      });
    },

    async unlinkAccount(params: { provider: string; providerAccountId: string }) {
      await db
        .delete(accounts)
        .where(and(
          eq(accounts.provider, params.provider),
          eq(accounts.providerAccountId, params.providerAccountId)
        ));
    },

    // SESSIONS

    async createSession(session: AdapterSession) {
      const [newSession] = await db
        .insert(sessions)
        .values({
          sessionToken: session.sessionToken,
          userId: Number(session.userId),
          expires: session.expires,
        })
        .returning();

      return newSession as unknown as AdapterSession;
    },

    async getSessionAndUser(sessionToken: string) {
      const [session] = await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, sessionToken));

      if (!session) return null;

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, session.userId));

      if (!user) return null;

      return {
        session: session as unknown as AdapterSession,
        user: user as unknown as AdapterUser,
      };
    },

    async updateSession(session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">) {
      const [updatedSession] = await db
        .update(sessions)
        .set({
          userId: session.userId ? Number(session.userId) : undefined,
          expires: session.expires,
        })
        .where(eq(sessions.sessionToken, session.sessionToken))
        .returning();

      return updatedSession as unknown as AdapterSession ?? null;
    },

    async deleteSession(sessionToken: string) {
      await db
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken));
    },

    // VERIFICATION TOKENS

    async createVerificationToken(token: VerificationToken) {
      const [newToken] = await db
        .insert(verificationTokens)
        .values({
          identifier: token.identifier,
          token: token.token,
          expires: token.expires,
        })
        .returning();

      return newToken;
    },

    async useVerificationToken(params: { identifier: string; token: string }) {
      const [vt] = await db
        .select()
        .from(verificationTokens)
        .where(and(
          eq(verificationTokens.identifier, params.identifier),
          eq(verificationTokens.token, params.token)
        ));

      if (!vt) return null;

      await db
        .delete(verificationTokens)
        .where(and(
          eq(verificationTokens.identifier, params.identifier),
          eq(verificationTokens.token, params.token)
        ));

      return vt;
    },
  };
}
