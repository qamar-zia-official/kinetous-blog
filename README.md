# Kinetous official website

## File Name Conventions

- pages are named as: page.tsx
- sections are named as: <section-name>.sec.tsx --> eg... header.sec.tsx, about.sec.tsx
- hooks are named as: <hook-name>.hook.tsx --> eg... useNavPN.hook.ts, useScrollPN.hook.tsx
- components are named as: <component-name>.cmp.tsx --> eg... sectionHeading.cmp.ts, Card.cmp.tsx
- type files are named as: <type-file-name>.types.ts --> eg... nav.types.ts, services.types.ts
- decalrative logic components are named as: <decalrative-logic-component-name>.dlog.ts --> eg... setSections.dlog.ts

### NOTE: Declarative logic components are the components that wrap hooks, store, global state or other kind of reusable or harder logic into clean react components and we can provide those components with props to use that logic without worrying about the actual logic itself like setting section navigation on different pages without using nav.store.ts or useSection.hook.ts and wrapping their logic into intuitive clean component
