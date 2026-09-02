OUTPUT="architecture-dump.txt"

> "$OUTPUT"

for file in \
"components/navbar/nav-context-provider.tsx" \
"components/navbar/use-scroll-pn.tsx" \
"components/navbar/use-navigation.ts" \
"components/navbar/set-sections.tsx" \
"components/navbar/nav.tsx" \
"components/navbar/nav-data.tsx" \
"components/navbar/nav.types.ts" \
"components/bot/bot-provider.tsx" \
"components/bot/bot.tsx" \
"(company)/page.tsx" \
"(company)/sections/about/about.tsx" \
"(company)/sections/contact/contact.tsx" \
"(company)/sections/contact/form.tsx" \
"(company)/sections/header/audit-input.tsx" \
"(company)/sections/header/header.tsx" \
"(company)/sections/logos/logos.tsx" \
"(company)/sections/our-process/our-process-data.tsx" \
"(company)/sections/our-process/our-process.tsx" \
"(company)/sections/our-process/process-item.tsx" \
"(company)/sections/our-services/our-services-data.tsx" \
"(company)/sections/our-services/our-services.tsx" \
"(company)/sections/our-work/our-work-data.tsx" \
"(company)/sections/our-work/our-work.tsx" \
"(company)/sections/porfolio/port-details.tsx" \
"(company)/sections/porfolio/port1-data.tsx" \
"(company)/sections/porfolio/port1.tsx"
do
    {
        printf "\n\n================================================================================\n"
        printf "FILE: %s\n" "$file"
        printf "================================================================================\n\n"
        nl -ba "$file"
    } >> "$OUTPUT"
done

echo "Done! Output written to $OUTPUT"
