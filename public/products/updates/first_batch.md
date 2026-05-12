# Product Update Batch Template

Use this file to stage each batch of catalog changes before we implement them. Fill in the sections below, check off the tasks, then ping me to apply the updates.

## Quick workflow
1. Drop raw assets in `public/products/updates/images-before-compressing/`.
2. Compress/resize with:
   ```sh
   sips -s format jpeg -s formatOptions 80 --resampleWidth 960 "<source path>" --out <target path>
   ```
   *Adjust width if a product hero needs another size.*
3. Move optimized files into their final path (e.g. `public/products/<category>/<slug>.jpg`).
4. Note required code edits:
   - `src/lib/products-data.ts`
   - `src/lib/i18n/translations.ts`
   - Any other component/asset references.

## Batch metadata
- **Batch name:** `first-batch`
- **Owner:** _(your name)_
- **Target deploy/date:** _(YYYY-MM-DD)_
- **Related Jira / notes:**

## Summary of changes
- [x] Existing product copy updates
- [x] Existing product image replacements
- [ ] Product removals
- [ ] New product entries
- [ ] Other (specify)

## Existing products to update
| Product name / slug | Action (image/text/both) | Current asset | New asset (optimized path) | Copy tweaks needed? |
| --- | --- | --- | --- | --- |
| Konti Kan Optic Cable Protection (`konti-kan-optic-cable-protection`) | Image + copy refresh | /products/catalog/konti-optic-duct.jpg | `public/products/industrial/konti-kan-optic.jpg` *(optimized)* | Updated name/description to Monotub + availability notes |
| HDPE Optic Monotube (`electric-optic-conduit`) | Image refresh | /products/industrial/konti-cable-duct.jpg | `public/products/industrial/konti-optic-monotube.jpg` *(optimized)* | Done |
| Spiral PP Sewage Pipe (`spiral-pp-sewage-pipe`) | Image refresh | /products/civil/konti-kan-corrugated-sewage.jpg | `public/products/civil/konti-spiral-pp-pipe.jpg` *(optimized)* | Done |

### Copy changes for existing products
Document exact text replacements so we can update translation files quickly.

```jsonc
// Example format
"product-id": {
  "name": { "sq": "", "en": "" },
  "description": { "sq": "", "en": "" }
}
```

## Products to remove
| Product name / slug | Reason | Files to clean up |
| --- | --- | --- |
|  |  |  |

## New products to add
| Product name | Proposed slug | Category | Image path (optimized) | Key specs summary |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### Draft product object
Provide the payload we should insert into `src/lib/products-data.ts`.

```ts
{
  id: "",
  slug: "",
  name: "",
  shortName: "",
  category: "",
  material: "",
  application: "",
  description: "",
  image: "/products/...",
  standards: [],
  keyProperties: {
    "": ""
  },
  dimensions: null,
  tags: [],
  suppliers: []
}
```

### Translation entries
Record text for `src/lib/i18n/translations.ts`.

```jsonc
"new-product-id": {
  "name": { "sq": "", "en": "" },
  "shortName": { "sq": "", "en": "" },
  "description": { "sq": "", "en": "" }
}
```

## Outstanding questions / approvals
- [ ] _Example:_ Need supplier confirmation for pressure rating?

---

Once this template is filled, let me know and I will execute the batch updates (asset moves, code edits, deletions, additions).
