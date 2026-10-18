# Karta — Feature Flow & Build Roadmap

## Current state (what's done)

```mermaid
flowchart LR
    Landing["Landing Page"]
    SignIn["Sign In / Up"]
    SelectOrg["Select Org"]
    Dashboard["Org Dashboard"]
    Sidebar["Sidebar\n(orgs, nav)"]
    BoardList["Board List"]
    CreateBoard["Create Board\n(popover + Unsplash picker)"]

    Landing --> SignIn --> SelectOrg --> Dashboard
    Dashboard --- Sidebar
    Dashboard --> BoardList
    BoardList --> CreateBoard
```

### Built features
- [x] Marketing landing page with CTA
- [x] Clerk auth (sign-in, sign-up, org selection)
- [x] Middleware: public routes, auth gating, org redirect
- [x] Dashboard layout: sidebar (org list + accordion nav), navbar, mobile sidebar
- [x] Org pages: dashboard, settings, activity (stub), billing (stub)
- [x] Board creation: form popover, Unsplash image picker, server action
- [x] Data model: Board (id, orgId, title, image fields, timestamps)
- [x] Server action pattern: Zod schema → safe action → useAction hook
- [x] Toast notifications (sonner)

---

## Build roadmap (what's next)

### Phase 1 — Board view (core loop)

The minimum to open a board and see something.

```mermaid
flowchart LR
    OrgDash["Org Dashboard"]
    BoardPage["Board Page"]
    List1["List 1\n─────\nCard A\nCard B\nCard C\n+ add card"]
    List2["List 2\n─────\nCard D\nCard E\n+ add card"]
    AddList["+ Add list"]

    OrgDash -- "click board" --> BoardPage
    BoardPage --- List1
    BoardPage --- List2
    BoardPage --- AddList
```

**Data models to add:**

```mermaid
erDiagram
    Board ||--o{ List : "has"
    List ||--o{ Card : "has"

    Board {
        string id PK
        string orgId
        string title
        string imageId
        string imageThumbUrl
        string imageFullUrl
        string imageLinkHtml
        string imageUserName
        datetime createdAt
        datetime updatedAt
    }

    List {
        string id PK
        string title
        int order
        string boardId FK
        datetime createdAt
        datetime updatedAt
    }

    Card {
        string id PK
        string title
        string description
        int order
        string listId FK
        datetime createdAt
        datetime updatedAt
    }
```

**Tasks:**
- [ ] Add List and Card models to `contract.prisma`, run migration
- [ ] Board view page: `app/(platform)/(dashboard)/board/[boardId]/page.tsx`
- [ ] Board layout with background image (from Board record)
- [ ] Server actions: create-list, update-list-order, delete-list
- [ ] Server actions: create-card, update-card-order, delete-card
- [ ] List component: title, cards, "add card" form
- [ ] Card component: title, click to open detail
- [ ] Display existing boards (with images) on org dashboard board-list

### Phase 2 — Drag & drop

```mermaid
flowchart LR
    subgraph Before
        L1a["List 1\n─────\nCard A\nCard B"]
        L2a["List 2\n─────\nCard C"]
    end

    subgraph After["After drag Card B to List 2"]
        L1b["List 1\n─────\nCard A"]
        L2b["List 2\n─────\nCard B\nCard C"]
    end

    Before -- "drag & drop" --> After
```

- [ ] Install `@hello-pangea/dnd` (maintained fork of react-beautiful-dnd)
- [ ] Drag to reorder lists horizontally
- [ ] Drag to reorder cards within a list
- [ ] Drag to move cards across lists
- [ ] Server action: `update-list-order` (batch reorder)
- [ ] Server action: `update-card-order` (batch reorder, handles cross-list moves)

### Phase 3 — Card detail modal

```mermaid
flowchart TB
    subgraph Modal["Card Detail Modal"]
        Title["Card Title\nin list 'List Name'"]
        Desc["Description\n(editable textarea)"]
        subgraph Actions
            Copy["Copy"]
            Move["Move"]
            Delete["Delete"]
        end
        subgraph Activity
            A1["User moved this card"]
            A2["User created this card"]
        end
    end

    Title --- Desc
    Desc --- Actions
    Desc --- Activity
```

- [ ] Card detail modal (intercept route or dialog)
- [ ] Editable title (inline rename)
- [ ] Description editor (textarea or basic markdown)
- [ ] Server actions: update-card (title, description), delete-card, copy-card

### Phase 4 — Audit log

```mermaid
erDiagram
    AuditLog {
        string id PK
        string orgId
        string action "CREATE | UPDATE | DELETE"
        string entityId
        string entityType "BOARD | LIST | CARD"
        string entityTitle
        string userId
        string userImage
        string userName
        datetime createdAt
    }
```

- [ ] Create `createAuditLog` utility (called from server actions)
- [ ] Org activity page: list recent audit entries
- [ ] Card detail modal: show card-specific activity

### Phase 5 — Board management

- [ ] Board settings: rename, delete
- [ ] Board page navbar (board title, menu)
- [ ] Copy list (duplicate list + all its cards)

### Phase 6 — Billing (optional, for completeness)

- [ ] Stripe integration (checkout, webhook, portal)
- [ ] Org subscription model / board limit (e.g. 5 free)
- [ ] Billing page: current plan, manage subscription
- [ ] Gate board creation behind limit check

### Phase 7 — Polish (optional)

- [ ] Labels on cards (colored tags)
- [ ] Due dates on cards
- [ ] Checklists inside cards
- [ ] Search / filter cards
- [ ] Keyboard shortcuts
- [ ] Responsive improvements

---

## Server action naming convention

Each action gets its own directory under `actions/`:

```
actions/
  create-board/        # schema.ts, index.ts, types.ts
  create-list/
  update-list-order/
  delete-list/
  create-card/
  update-card/
  update-card-order/
  delete-card/
  copy-card/
  copy-list/
  delete-board/
  update-board/
```

Standalone actions (no schema needed) can be single files:
```
actions/
  fetch-unsplash-images.ts
```

## Request flow

```mermaid
sequenceDiagram
    participant UI as Client Component
    participant Hook as useAction
    participant SA as Server Action
    participant Zod as Zod Schema
    participant Auth as Clerk auth()
    participant DB as Prisma DB

    UI->>Hook: execute(formData)
    Hook->>SA: call serverAction(data)
    SA->>Zod: validate input
    alt Validation fails
        Zod-->>SA: fieldErrors
        SA-->>Hook: { fieldErrors }
        Hook-->>UI: onError / show field errors
    else Validation passes
        Zod-->>SA: validatedData
        SA->>Auth: auth() check
        alt Unauthorized
            Auth-->>SA: no userId/orgId
            SA-->>Hook: { error: "Unauthorized" }
            Hook-->>UI: onError toast
        else Authorized
            Auth-->>SA: userId, orgId
            SA->>DB: create / update / delete
            DB-->>SA: result
            SA->>SA: revalidatePath()
            SA-->>Hook: { data: result }
            Hook-->>UI: onSuccess toast, navigate
        end
    end
```

## Full app map (target)

```mermaid
flowchart TB
    Landing["Landing Page\n/"]
    SignIn["Sign In\n/sign-in"]
    SignUp["Sign Up\n/sign-up"]
    SelectOrg["Select Org\n/select-org"]

    OrgDash["Org Dashboard\n/organization/[orgId]"]
    Settings["Settings\n.../settings"]
    Activity["Activity Log\n.../activity"]
    Billing["Billing\n.../billing"]

    BoardPage["Board Page\n/board/[boardId]"]
    CardModal["Card Detail Modal"]

    Landing --> SignIn
    Landing --> SignUp
    SignIn --> SelectOrg
    SignUp --> SelectOrg
    SelectOrg --> OrgDash

    OrgDash --> Settings
    OrgDash --> Activity
    OrgDash --> Billing
    OrgDash -- "click board" --> BoardPage

    BoardPage -- "click card" --> CardModal
```
