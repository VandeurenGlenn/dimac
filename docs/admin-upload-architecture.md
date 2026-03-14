# Admin Upload Architecture

## Doel

De huidige adminroute `#!/admin` is geschikt voor lokaal beheer in een statische GitHub Pages workflow, maar niet als volwaardige productiebeveiliging. Dit document beschrijft de aanbevolen server-backed opvolger.

## Aanbevolen opzet

- Publieke site blijft statisch gehost op GitHub Pages.
- Admin-auth en uploadverwerking draaien op een aparte backend of edge laag.
- Aanbevolen baseline: Supabase Auth + Storage + Postgres + Edge Functions.
- Alternatief met dezelfde contracten: Cloudflare Workers + R2 + D1 of een kleine Node API.

## Gewenste componenten

### 1. Auth-service

- Admin logt in met e-mail en wachtwoord of magic link.
- Server zet een `HttpOnly`, `Secure`, `SameSite=Strict` sessiecookie.
- De frontend bewaart geen wachtwoordhashes of auth-state meer in `sessionStorage`.
- Alleen gebruikers met rol `admin` of `content-manager` krijgen toegang tot upload- en delete-acties.

### 2. Upload-API

- `POST /api/admin/uploads`
- `DELETE /api/admin/uploads/:assetId`
- `POST /api/admin/projects`
- `DELETE /api/admin/projects/:projectId`
- Elke write-endpoint controleert sessie, rol, rate limits en CSRF-bescherming.

### 3. Storage-model

- Originele upload gaat naar een private bucket.
- Een worker of edge function genereert varianten in `600`, `960` en `1200` breedte als webp of avif.
- Afgeleide assets gaan naar een publieke bucket of CDN-path.
- Metadata komt in een tabel `project_assets` met velden:
  - `id`
  - `project_slug`
  - `original_name`
  - `variants`
  - `width`
  - `height`
  - `alt_text`
  - `sort_order`
  - `created_at`
  - `created_by`

### 4. Publiek manifest

- Publieke galerij leest niet langer direct uit lokale files.
- De site haalt een read-only manifest op via `GET /api/realizations-manifest`.
- Die endpoint levert exact het formaat dat de huidige frontend al gebruikt:

```json
{
  "postbaan schaffen": [
    "https://cdn.example.com/postbaan-schaffen/badkamer_lot3_1200x900.webp"
  ]
}
```

## Veiligheidsmaatregelen

- `HttpOnly` sessiecookies in plaats van client-side auth flags.
- Rollen en toegangscontrole op elke write-operatie.
- MIME-validatie en size-limieten voor elke upload.
- Server-side bestandsnaamnormalisatie.
- Auditlog per create, update en delete.
- Rate limiting op login en upload endpoints.
- Optioneel virus- of malware-scan op originelen vóór publicatie.

## Frontend-migratie

### Huidige toestand

- `src/admin-session.ts` gebruikt een build-time hash en `sessionStorage`.
- `src/elements/image-manager.ts` schrijft direct naar een lokale map via de File System Access API.

### Doeltoestand

- `src/admin-session.ts` wordt vervangen door een kleine API-client:
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/session`
- `src/elements/image-manager.ts` wisselt lokale mapacties in voor API-calls.
- `src/views/admin.ts` kan inhoudelijk grotendeels blijven bestaan.

## Migratiepad

1. Zet auth en upload-api op buiten GitHub Pages.
2. Maak een publieke manifest-endpoint met hetzelfde responseformaat als vandaag.
3. Vervang de logic in `src/admin-session.ts` door server-auth.
4. Vervang lokale file writes in `src/elements/image-manager.ts` door multipart uploads.
5. Laat `src/views/realizations.ts` het manifest voortaan van de API lezen.
6. Schakel de build-time hashgate uit zodra de serverroute live is.

## Waarom deze richting

- GitHub Pages kan zelf geen veilige write-endpoints hosten.
- Auth in de browser alleen is onvoldoende voor productiecontentbeheer.
- Deze aanpak houdt de publieke site snel en statisch, maar verplaatst gevoelige acties naar een juiste trust boundary.