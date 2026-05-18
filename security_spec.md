# Security Specification - MundoCanceles PRO

## Data Invariants
1. A user can only access their own prices, projects, notes, history, and cart items.
2. Prices and project totals must be non-negative.
3. Created timestamps (if any) must be validated against `request.time`.
4. Document IDs must be within acceptable size limits (<= 128 chars).

## Dirty Dozen Payloads (Rejection Targets)
1. **Malicious Price Update**: `{ "unitPrice": -10.0, "type": "meter" }` (Negative price)
2. **Identity Spoofing (Price)**: Write to `/users/VICTIM_ID/prices/1677` as `ATTACKER_ID`.
3. **Ghost Field (Project)**: `{ "nombre": "P1", "fecha": "2023-01-01", "items": [], "total": 100, "isVerified": true }` (Unknown field)
4. **Invalid Type (CartItem)**: `{ "codigo": "C1", "cantidad": "LOTS", ... }` (Quantity as string)
5. **PII Blanket Read**: Authenticated user attempts `list` on `/users/VICTIM_ID/notes`.
6. **Self-Assigned Admin**: Attempt to write to `/admins/ATTACKER_ID`.
7. **Resource Poisoning (Note)**: Large content string (over limit).
8. **Orphaned Project**: Create project with non-existent userId in path (managed by wildcard match).
9. **State Shortcut**: (Not highly applicable here, but maybe status if added).
10. **Timestamp Fraud**: `{ "fecha": "2999-01-01" }` for history if server time is required.
11. **ID Poisoning**: Document ID with junk characters.
12. **Update Gap**: Partial update to Price missing required fields (if not whitelisted in hasOnly).

## Test Runner (Draft)
```typescript
// firestore.rules.test.ts
// This file would contain unit tests using @firebase/rules-unit-testing
// verifying the above scenarios return PERMISSION_DENIED.
```
