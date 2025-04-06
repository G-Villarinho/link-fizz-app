interface HeadingProps {
  title: string;
  subtitle?: string;
}
export function Heading({ title, subtitle = "" }: HeadingProps) {
  return (
    <header className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-sm font-medium">{subtitle}</p>
    </header>
  );
}
