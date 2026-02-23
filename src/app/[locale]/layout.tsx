import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import TabNavigation from "@/components/TabNavigation";
import ThemeToggle from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const locales = ["ja", "en"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="fixed top-0 right-0 z-40 p-2 flex items-center gap-1">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <main className="pb-20 min-h-screen">
        {children}
      </main>
      <TabNavigation />
    </NextIntlClientProvider>
  );
}
