# Task Day 5 B66 - Stage 2 BE (Transfer points)

## Steps
1. Update Prisma schema: tambah field `points Int @default(0)` pada model `User`.
2. Tambah dependencies yang dibutuhkan: `zod`.
3. Implement middleware:
   - `logger.middleware.ts`
   - `apiKey.middleware.ts` (header `x-api-key`, env `API_KEY`).
4. Implement Zod validation untuk body `POST /transfer`.
5. Implement controller transfer menggunakan `prisma.$transaction`:
   - cek sender/receiver ada
   - sender != receiver
   - amount > 0
   - sender points cukup
   - update via transaction agar rollback otomatis.
6. Tambahkan global error handler middleware (semua error ditangani di satu tempat).
7. Wiring route `POST /transfer`.
8. Buat/adjust migration untuk PostgreSQL dan jalankan migration.
9. Jalankan server dan test dengan Postman skenario sukses & gagal.

