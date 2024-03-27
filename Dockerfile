FROM node:20-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app


COPY package.json package-lock.json ./
RUN \
    npm ci



FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
  npx prisma generate && \
  npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
# RUN mkdir public/images && mkdir public/images/news && mkdir public/images/project && mkdir public/images/recruit
RUN chown nextjs:nodejs .next
RUN chown nextjs:nodejs -R ./public

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static

# USER nextjs

EXPOSE 3000

ENV PORT 3000

ENV HOSTNAME "0.0.0.0"

# USER nextjs

CMD ["node", "server.js"]