/*
  Warnings:

  - You are about to drop the column `Type` on the `Products` table. All the data in the column will be lost.
  - Added the required column `type` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "quantity" REAL NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_Products" ("amount", "id", "name", "quantity") SELECT "amount", "id", "name", "quantity" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
